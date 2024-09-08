let buttons = document.querySelectorAll("button")
let myInt = document.querySelector('.inputEl')

buttons.forEach((button)=>{
     button.addEventListener('click',function(){
       switch(button.innerText){
        case 'Clear':
          myInt.value = ''
          
        break;
        case "AC":
          
          myInt.value = myInt.value.slice(0,-1)
        break;
        case '=':
          try{
            myInt.value = eval(myInt.value)
          
          }
         catch{
          myInt.value = "ERROR"
         } 
         break;
       default:
         myInt.value += button.innerText

       }
     })
})