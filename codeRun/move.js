const gameWrap = document.querySelector('.game-wrap');
const character = gameWrap.querySelector('.character');
const keyUp = document.querySelector('.arrow-up');
const keyLeft = document.querySelector('.arrow-left');
const keyDown = document.querySelector('.arrow-down');
const keyRight = document.querySelector('.arrow-right');
let characterPosX=657;
const keys={};

class FireMake{
    constructor(){
        this.firePosX= Math.floor(Math.random()*1330);
        this.firePosY=-140;
        this.divEl=document.createElement('div');
    }
    making(){
        this.divEl.classList.add('item','fire');
        this.divEl.style.transform = `translateY(${this.firePosY}px)`
        this.divEl.style.left = this.firePosX+'px';
        gameWrap.appendChild(this.divEl);
    }
    dropDown(){
        const moving = setInterval(()=>{
            if(this.firePosY<620){
                this.firePosY +=5;
                this.divEl.style.transform = `translateY(${this.firePosY}px)`;
            }else{
                this.divEl.remove();
                clearInterval(moving);
            }
            if(this.firePosY >= 530){
                if(this.firePosX <= characterPosX+35 && this.firePosX+70 >= characterPosX+35  ){
                    console.log('아야');
                    this.divEl.remove();
                    clearInterval(moving);
                }
            }
        },20);
    }
}

class itemMake{
    constructor(){

    }
}




const fire = new FireMake();
fire.making();
fire.dropDown();

setInterval(()=>{
    const fire = new FireMake();
    fire.making();
    fire.dropDown();
},1000);

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
    if(keys.ArrowRight&&characterPosX<1314){
        characterPosX+=2;
        character.style.transform = `translateX(${characterPosX}px) rotateY(0deg)`;
        character.classList.add('move');
        // keyRight.classList.add('key-press');
    }else{
        character.classList.remove('move');
        // keyRight.classList.remove('key-press');
    }

    if(keys.ArrowLeft&&characterPosX>0){
        characterPosX-=2;
        character.style.transform = `translateX(${characterPosX}px) rotateY(180deg)`;
        character.classList.add('move');
        // keyLeft.classList.add('key-press');
    }else{
        // keyLeft.classList.remove('key-press');
    }

    window.requestAnimationFrame(play);
}
window.requestAnimationFrame(play);
