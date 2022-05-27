const writeTitle = document.querySelector('.title-input');
const writeTxt = document.querySelector('.txt-input');
const uploadBtn = document.querySelector('.btn-upload');
const allDeletedBtn = document.querySelector('.all-delete-btn');
const showUl = document.querySelector('.memo-list');
const memes=[];
const MEMO_LIST = 'memoList';

if(localStorage.getItem(MEMO_LIST)){ //localStorage에 memo가 있으면 첫 화면 작성
    const nowMemoList = localStorage.getItem(MEMO_LIST);
    memes.push(...JSON.parse(nowMemoList));
    memes.forEach(memo => {
        memoMaking(memo);
    });
}
allDeletedBtn.addEventListener('click',()=>{// all memo delete btn
    if(confirm('정말로 모든 기록을 삭제하실 건가요?😱')){
        localStorage.clear(MEMO_LIST);
        showUl.innerHTML='';
        alert('모든 추억이 사라집니다.😥');
    }
});

uploadBtn.addEventListener('click',(e)=>{ // click upload btn => upload new memo 
    const userEmoji = document.querySelector('input[name="emoji"]:checked').value;
    if(writeTxt.value !== '' && writeTitle.value){
        const newMemo = {
            title:writeTitle.value,
            txt: writeTxt.value,
            id: new Date().getTime(),
            emoji:userEmoji,
        }
        memes.push(newMemo);
        localStorage.setItem(MEMO_LIST,JSON.stringify(memes));
        memoMaking(newMemo);
    }else{
        alert('텍스트를 입력해주세요.');
    }
});

showUl.addEventListener('click',(e)=>{ // memo delete btn
    if(e.target.classList.contains('btn-delete')){
        const nowMemoList = localStorage.getItem(MEMO_LIST);
        const arrMemo = JSON.parse(nowMemoList);
        const parentLi = e.target.parentElement;

        
        if(confirm('해당 기록을 삭제합니다.')){
            parentLi.remove();
            localStorage.setItem(MEMO_LIST,JSON.stringify(arrMemo.filter(x => x.id != parentLi.id)));
            alert('삭제되었습니다.');
        }
    }
});

function memoMaking(memo){ //make memo li tag
    const liEl = document.createElement('li');
    const btnEl = document.createElement('button');
    const h3El = document.createElement('h3');
    const pEl = document.createElement('p');
    const spanEl = document.createElement('span');
    const writeDate = new Date(memo.id);

    h3El.classList.add('title-memo');
    h3El.textContent =memo.title;
    
    pEl.classList.add('txt-memo','scroll');
    pEl.innerText= memo.txt;
    // pEl.textContent = memo.txt;
    
    spanEl.classList.add('time-memo');
    spanEl.textContent =writingTime(writeDate);
    
    btnEl.classList.add('btn', 'btn-delete');
    btnEl.textContent='삭제';
    
    liEl.classList.add('memo', `${memo.emoji}-emoji`);
    liEl.id=memo.id;
    
    liEl.appendChild(h3El);
    liEl.appendChild(pEl);
    liEl.appendChild(spanEl);
    liEl.appendChild(btnEl);
    showUl.prepend(liEl);
}

function writingTime(day){ //make write time 
    const dayArr = ['일','월','화','수','목','금','토'];
    let resultDay='';
    resultDay = `${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}/${dayArr[day.getDay()]}`;

    let hour = day.getHours();
    if(hour>12){
        hour = `${hour- 12}`;
        resultDay += ` PM ${hour.padStart(2, '0')}:`
    }else{
        hour += "";
        resultDay += ` AM ${hour.padStart(2, '0')}:`
    }

    let minute = day.getMinutes()+"";
    resultDay += minute.padStart(2, '0');

    return resultDay;
}