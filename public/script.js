async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;
  
    document.getElementById('messages').innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })
    });
  
    const data = await response.json();
    document.getElementById('messages').innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
    document.getElementById('user-input').value = '';
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  }
  