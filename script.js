let clickPlay=new Audio('./assets/gun.wav');
let lostGame=new Audio('./assets/lost.wav');
let winGame=new Audio('./assets/win.wav');
let score=0;
let name=prompt('Enter your name');
if(!window.localStorage.getItem('leaderBoard'))
{
    window.localStorage.setItem('leaderBoard',JSON.stringify([]));

}
else
{

}
let main=(level)=>
{
    document.querySelector('#player').innerText = `Welcome ${name}`
    
    if(level=='easy')cells=10;
    else if(level=='medium')cells=15;
    else cells=20;
    //Generating the grid and assinging the numbers
    const table=document.querySelector('table')
    let arr=new Array(cells*cells)
    for(let i=1;i<=cells*cells;i++)
    {
        arr[i-1]=i
    }
    arr.sort(()=>Math.random()-0.5)
    let counter=0;
    for(let i=0;i<cells;i++)//generating rows
    {
        let tr= document.createElement('tr');
        for(let j=0;j<cells;j++)//generating cells
        {
            let td=document.createElement('td');
            // td.innerText=arr[counter];
            //Giving ID to every element so that we can use that id to check the number instead of using innertext
            td.setAttribute('id',arr[counter])
            td.addEventListener('click',onClickhandler);
            counter++;
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    // Handling the click Event   
    function onClickhandler(event)
    {
        clickPlay.play()
        const dispaly=document.querySelector('.flex');
        let tableData=document.querySelectorAll('td')
    
        //changing css of the selected items
        event.target.style.backgroundColor='red';
        
        // Checking whetrer number is prime or not
        let clickedNum=Number(event.target.getAttribute('id'));
        document.querySelector('.userClicked').innerText=clickedNum;
        
        score++;
        if(clickedNum==1)
        {
            document.querySelector('#div1').style.visibility='hidden';
            document.querySelector('#player').style.visibility='hidden';
            winGame.play()
            dispaly.innerHTML=
            `
            <div style="display:flex;flex-direction: column; justify-content: center; align-items: center;">
                <h3 style="text-align: center ;color:green ;font-size: xx-large; font-weight: bolder;">YOU WON THE GAME</h3>
                <h3 style="text-align: center ;color:#780909 ;font-size: xx-large; font-weight: bolder;">YOUR SCORE IS ${score}</h3>
                <button class="btn-styling" onclick="doRanking()">LEADERBOARD</button>
            </div>
            `
            return
            
        }
        
        function isPrime(Num)
        {
            for(let t=2;t<Num;t++)
            {
                if(Num%t==0) return false
            }
            return true
        }
        
        if(isPrime(clickedNum))
        {
            lostGame.play()
            document.querySelector('#div1').style.visibility='hidden';
            document.querySelector('#player').style.visibility='hidden';
            dispaly.innerHTML=
            `
            <div style="display:flex;flex-direction: column; justify-content: center; align-items: center;">
            <h3 style="text-align: center ;color:#780909 ;font-size: xx-large; font-weight: bolder;">YOU LOST THE GAME</h3>
            <button class="btn-styling" onclick=window.location.reload()>RESTART</button>
            </div>
            `
            return
        }
        else
        {
            for(let i=0;i<tableData.length;i++)
            {
                if(Number(tableData[i].getAttribute('id'))%clickedNum===0)
                {
                    tableData[i].innerHTML='<td>X</td>'
                    tableData[i].classList.add('multi')
                }
            }
        }
    }
    document.querySelector('#score').innerText=("YOUR ATTEMPTS ARE ",score);
}  

function doRanking()
{
    let leaderBoard=JSON.parse(window.localStorage.getItem('leaderBoard'));
    let indexFound=leaderBoard.findIndex((player)=>player.attempts==score);

    if(indexFound!=-1)
    {
        leaderBoard[indexFound].playerId.push(name);
    }
    else
    {
        let tempObj=
        {
            playerId:[name],
            attempts:score
        }
        leaderBoard.push(tempObj);
    }

    leaderBoard.sort((a,b)=>a.attempts-b.attempts);

    window.localStorage.setItem('leaderBoard',JSON.stringify(leaderBoard))
    //creating table and its head elements

    const tbody=document.querySelector('tbody')
    let tr,td1,td2,td3
    document.querySelector('#winnerTable').style.visibility='visible';
    for(i=0;i<leaderBoard.length;i++)
    {
    
        tr=document.createElement('tr');

        td1=document.createElement('td');
        td1.innerText=i+1;
    
        td2=document.createElement('td');
        td2.innerText=leaderBoard[i].playerId;
        
        td3=document.createElement('td');
        td3.innerText=leaderBoard[i].attempts;
    
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)


        tbody.appendChild(tr)
    }
}
    
