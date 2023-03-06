let client = null;

const chatTable = document.getElementById("chat-table")
const chatInput = document.getElementById("chat-input")
console.log("loaded", chatInput, chatTable)
const addMessage = (message) => {
    console.log(`ADD new message - [${message}]`)
    const messageComponent = document.createElement("div")
    messageComponent.innerText = message
    chatTable.appendChild(messageComponent)
}

function getMessageFromInput() {
    const message = chatInput.value
    chatInput.value = ""
    return { value: message }
}

function sendMessage() {
    const message = getMessageFromInput()
    client.send("/app/chat", {}, JSON.stringify(message))
}


function connect() {
    client = Stomp.client("ws://localhost:8080/chat")
    client.connect(
        {},
        function (frame) {
            client.subscribe(
                "/topic/messages",
                function (message) {
                    const showMessage = (message) => {
                        const chatMessage = { value: JSON.parse(message.body).value }
                        console.log(chatMessage.value)
                        addMessage(chatMessage.value)
                    }
                    showMessage(message)
                }
            )
        },
        function (err) {
            console.error("CONNECTION ERROR", { err })
        })
}
