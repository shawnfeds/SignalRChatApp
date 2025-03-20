const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

function encodeMorse(text) {
    return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}

function decodeMorse(morse) {
    const morseToChar = Object.entries(morseCode).reduce((acc, [char, code]) => {
        acc[code] = char;
        return acc;
    }, {});
    return morse.split(' ').map(code => morseToChar[code] || '').join('');
}

document.getElementById('ToggleCode').addEventListener('click', function () {
    var toggle = document.getElementById('ToggleCode');
    var icon = toggle.classList.contains('fa-user-secret') ? 'fa-info-circle' : 'fa-user-secret';
    var textarea = document.getElementById('messageInput');
    var message = textarea.value;

    switch (icon) {
        case 'fa-user-secret':
            toggle.classList.remove('fa-info-circle');
            toggle.classList.add('fa-user-secret');
            var encodedMessage = encodeMorse(message);
            console.log('encoded: ' + encodedMessage);
            textarea.value = encodedMessage;
            break;
        case 'fa-info-circle':
            toggle.classList.remove('fa-user-secret');
            toggle.classList.add('fa-info-circle');
            var decodedMessage = decodeMorse(message);
            console.log('decode: ' + decodedMessage);
            textarea.value = decodedMessage;
            break;
    }
    console.log(icon);
});
