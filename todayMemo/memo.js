const writeTitle = document.querySelector('.title-input');
const writeTxt = document.querySelector('.txt-input');
const uploadBtn = document.querySelector('.btn-upload');
const allDeletedBtn = document.querySelector('.all-delete-btn');
const waitingMsg = document.querySelector('.waiting-msg');
const showUl = document.querySelector('.memo-list');
const memes=[];
const MEMO_LIST = 'memoList';

window.addEventListener('load',()=>{
    toggleWaitingMag();
})

if(localStorage.getItem(MEMO_LIST)){ //localStorage에 memo가 있으면 첫 화면 작성
    const nowMemoList = localStorage.getItem(MEMO_LIST);
    memes.push(...JSON.parse(nowMemoList));
    memes.forEach(memo => {
        memoMaking(memo);
    });
}

allDeletedBtn.addEventListener('click',()=>{// 모든 메모 삭제
    if(confirm('정말로 모든 기록을 삭제하실 건가요?😱')){
        localStorage.clear(MEMO_LIST);
        showUl.innerHTML='';
        alert('모든 추억이 사라집니다.😥');
        toggleWaitingMag();
    }
});

uploadBtn.addEventListener('click',(e)=>{ // 새로운 메모 작성 등록
    const userEmoji = document.querySelector('input[name="emoji"]:checked').value;
    if(writeTxt.value !== '' && writeTitle.value !== ''){
        const newMemo = {
            title:writeTitle.value,
            txt: writeTxt.value,
            id: new Date().getTime(),
            emoji:userEmoji,
        }
        memes.push(newMemo);
        localStorage.setItem(MEMO_LIST,JSON.stringify(memes));
        memoMaking(newMemo);
        toggleWaitingMag();
    }else if(writeTitle.value === ''){
        alert('제목을 입력해주세요.');
    }else if(writeTxt.value === ''){
        alert('내용을 입력해주세요.');
    }
});

showUl.addEventListener('click',(e)=>{ // 해당 메모만 삭제
    if(e.target.classList.contains('btn-delete')){
        const nowMemoList = localStorage.getItem(MEMO_LIST);
        const arrMemo = JSON.parse(nowMemoList);
        const parentLi = e.target.parentElement;

        
        if(confirm('해당 기록을 삭제합니다.')){
            parentLi.remove();
            localStorage.setItem(MEMO_LIST,JSON.stringify(arrMemo.filter(x => x.id != parentLi.id)));
            alert('삭제되었습니다.');
            toggleWaitingMag();
        }
    }
});

function toggleWaitingMag(){ // 리스트에 메모가 없을 시 메세지 함수
    const liListStatus =  showUl.querySelectorAll('li').length;
    (liListStatus===0)?waitingMsg.classList.remove('close'):waitingMsg.classList.add('close');
}

function memoMaking(memo){ //li.memo 제작 함수
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

function writingTime(day){ //li 안에 들어가는 요일 및 시간
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