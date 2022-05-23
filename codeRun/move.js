const startBtn = document.querySelector('.start-page .btn-start');
const infoWrap = document.querySelector('.info-wrap');
const scoreTxt = infoWrap.querySelector('.score-txt');
const lifeTxt = infoWrap.querySelector('.life-txt');
const gameWrap = document.querySelector('.game-wrap');
const character = gameWrap.querySelector('.character');
const keys={};
let characterPosX=657;
let scoreNum = 0;
let lifeNum = 5;

// item class
class ItemMake{
    constructor(item){
        this.itemPosX= Math.floor(Math.random()*1330);
        this.itemPosY=-140;
        this.divEl=document.createElement('div');
        this.item = item;
    }
    making(){
        this.divEl.classList.add('item',this.item);
        this.divEl.style.transform = `translateY(${this.itemPosY}px)`
        this.divEl.style.left = this.itemPosX+'px';
        gameWrap.appendChild(this.divEl);
    }
    dropDown(){
        const moving = setInterval(()=>{
            if(this.itemPosY<620){
                this.itemPosY +=5;
                this.divEl.style.transform = `translateY(${this.itemPosY}px)`;
            }else{
                this.divEl.remove();
                clearInterval(moving);
            }
            if(this.itemPosY >= 535 && this.itemPosX <= characterPosX+35 && this.itemPosX+70 >= characterPosX+35){
                if( this.item === 'fire'){
                    --lifeNum;
                    lifeTxt.textContent = lifeNum;
                }else if(this.item === 'coin'){
                    scoreNum += 100;
                    scoreTxt.textContent = scoreNum;
                    
                }else if(this.item === 'heart'){
                    ++lifeNum;
                    lifeTxt.textContent = lifeNum;
                }
                this.divEl.remove();
                clearInterval(moving);
            }
        },20);
    }
}

startBtn.addEventListener('click',(e)=>{
    e.target.parentElement.classList.add('close');
    infoWrap.classList.remove('close');
    character.classList.remove('close');
    console.dir();
    MakingitemAuto();
});


// item make auto
function MakingitemAuto() {
    const coinAuto = setInterval(()=>{
        const coin = new ItemMake('coin');
        coin.making();
        coin.dropDown();
    },3000);
    
    const heartAuto = setInterval(()=>{
        const heart = new ItemMake('heart');
        heart.making();
        heart.dropDown();
    },7000);
    
    const fire = new ItemMake('fire');
    fire.making();
    fire.dropDown();
    
    const fireAuto = setInterval(()=>{
        const fire = new ItemMake('fire');
        fire.making();
        fire.dropDown();
    },1000);
}


// character right & left move
document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        keys[e.key]=true;
    }
});
document.addEventListener('keyup',(e)=>{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        keys[e.key]=false;
    }
});


function play(){
    if(keys.ArrowRight&&characterPosX<1330){
        characterPosX+=5;
        character.style.transform = `translateX(${characterPosX}px) rotateY(0deg)`;
        character.classList.add('move');
    }

    if(keys.ArrowLeft&&characterPosX>0){
        characterPosX-=5;
        character.style.transform = `translateX(${characterPosX}px) rotateY(180deg)`;
        character.classList.add('move');
    }

    if(!keys.ArrowRight && !keys.ArrowLeft){character.classList.remove('move');}

    window.requestAnimationFrame(play);
}
window.requestAnimationFrame(play);
