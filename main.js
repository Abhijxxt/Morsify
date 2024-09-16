let repeat = false;
const editor = document.getElementById('morsecode')
const text = document.getElementById('text')
let first = 0;
let word = '';

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
];
let morse = ['._','_...','_._.','_..','.','.._.','__.','....','..','.___','_._','._..','__','_.','___',
    '.__.','__._','._.','...','_','.._','..._','.__','_.._','_.__','__..'
];


document.getElementById('copy-morse').addEventListener('click', () => {
    navigator.clipboard.writeText(editor.textContent);
    alert(editor.textContent)
})

function converter() {
    let index = morse.indexOf(word);
    text.textContent += letters[index];
}

document.onkeydown = (e) => {
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
        console.log("_");
        editor.textContent = editor.textContent + '_ ';
        word += "_";
        repeat = !repeat; 
    }else if (!repeat && e.key == ' '){
        console.log(".");
        word += ".";
        editor.textContent = editor.textContent + '. ';
    }
}

document.getElementById('clear').addEventListener('click', () => {
    editor.textContent = 'Press or Hold Space to write Morse Code';
    text.textContent = 'Text would be written here';
})