let repeat = false;
const editor = document.getElementById('morsecode')
const text = document.getElementById('text')
let first = 0;
let word = '';

const dotAudio = new Audio('audios/dot.mp3');
const dashAudio = new Audio('audios/dash.mp3');


let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
];
let morse = ['._','_...','_._.','_..','.','.._.','__.','....','..','.___','_._','._..','__','_.','___',
    '.__.','__._','._.','...','_','.._','..._','.__','_.._','_.__','__..'
];

document.getElementById('clear').addEventListener('click', () => {
    console.log('clicking');
    editor.textContent = 'Press or Hold Space to write Morse Code';
    text.textContent = 'Text would be written here';
    word = '';
    first = 0;
    document.getElementById('clear').disabled = true;
})


function playSound(letter) {
    if(letter == '.') {
        dotAudio.play();
        // await sleep(1000);
    }
    if(letter == '_') {
        dashAudio.play();
        // await sleep(1000);
        // dotAudio.addEventListener('ended', () => {return})
    }
}

document.getElementById('speak-morse').addEventListener('click', () => {
    let code = editor.textContent;
    let i = 0;
    var audioplayerID = setInterval(()=> {
        if(i<code.length) {
            console.log(code[i]);
            playSound(code[i]);
            i++;
        } else {
            clearInterval(audioplayerID);
        }
    }, 100);
    }
)

document.getElementById('copy-morse').addEventListener('click', () => {
    navigator.clipboard.writeText(editor.textContent);
    alert(editor.textContent)
})

function converter() {
    let index = morse.indexOf(word);
    text.textContent += letters[index];
}

document.onkeydown = (e) => {
    document.getElementById('clear').disabled = false;
    // console.log(e.key);
    if (first == 0) {
        editor.textContent = '';
        text.textContent = '';
        first = 1;
    }
    if (e.repeat && e.key == ' ') {
        repeat = true;
    }
}

document.onkeyup = (e) => {
    if(e.key == 'Enter') {
        editor.textContent = editor.textContent + '\xa0\xa0\xa0';
        converter();
        word = '';
    }
    if(repeat && e.key == ' ') {
        // console.log("_");
        editor.textContent = editor.textContent + '_ ';
        dashAudio.play();
        word += "_";
        repeat = !repeat; 
    }else if (!repeat && e.key == ' '){
        // console.log(".");
        dotAudio.play();
        word += ".";
        editor.textContent = editor.textContent + '. ';
    }
}
