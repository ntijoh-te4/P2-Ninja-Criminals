function jumpscare() {
    var jumpscare = document.getElementById("jumpscare");
    jumpscare.style.visibility = "visible";
    var audio = document.getElementById("scream");
    audio.play()

    setTimeout(()=>{
        jumpscare.style.visibility = 'hidden'
    }, 1250)

    var b = document.querySelector("#jsbutton");
    b.addEventListener("click",change);
    
    function change()
    {
    let i =Math.abs(Math.floor(Math.random()*window.innerWidth-55))
    let j = Math.abs(Math.floor(Math.random()*window.innerHeight-21));
    console.log('here' , i ,j , b.style.left , b.style.top);
        b.style.left = i+'px';
        b.style.top = j + "px";
    }


    }

    
    
