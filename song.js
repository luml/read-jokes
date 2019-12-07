document.querySelector('textarea[name="keyline"]').addEventListener('keydown', function(event){
    const line = document.querySelector('textarea[name="keyline"]').value;
    let finalLine;
    if(line.includes('you') || line.includes('love')){
        finalLine = 'You miss someone?';
    }else{
        finalLine = 'You\'re just blue, go out and do something, and it\'ll be fine';
    }
    if(event.key === 'Enter' && event.code === 'Enter'){
        document.querySelector('textarea[name="keyline"]').value = finalLine;
        document.querySelector('textarea[name="keyline"]').style.color = "deeppink";
    }else if(event.key === 'Escape' && event.code === 'Escape'){
        finalLine = '';
        document.querySelector('textarea[name="keyline"]').value = finalLine;
        document.querySelector('textarea[name="keyline"]').style.color = "teal";
    }
})