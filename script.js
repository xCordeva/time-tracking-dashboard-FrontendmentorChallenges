// importing data from Json file
const jsonFilePath = 'data.json';
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })

  .then(data => {
/////


    const timeFrames = document.querySelectorAll('.time-frame')
    const titleElements = document.querySelectorAll('.card-title')
    const currentTimeElements = document.querySelectorAll('.card-current')
    const previousTimeElements = document.querySelectorAll('.card-previous')

    // Converting titleElements to array to use the Find method
    const titleArray = Array.from(titleElements);
    
    
    let selectedTimeFrame = 'daily'
    timeFrames.forEach((frame)=>{
      frame.addEventListener('click', ()=>{
        selectedTimeFrame = frame.dataset.timeframe
        
        // remove the class from other frames that aren't clicked
        timeFrames.forEach((otherFrame)=>{
          if(otherFrame !== frame){
            otherFrame.classList.remove('choosen-timeframe')
          }
        })

        frame.classList.add('choosen-timeframe')
        rewriteTime()
      })
    })

    // run the function on page load 
    document.addEventListener('DOMContentLoaded', ()=>{
      rewriteTime()
    })
    rewriteTime()

    function rewriteTime(){
      data.forEach((item)=>{

        const card = titleArray.find((element) => element.id === item.title);

        if (card){
          card.innerHTML = `${item.title}`;
  
          currentTimeElements.forEach((time)=>{
            if (item.title === time.id && item.timeframes.hasOwnProperty(selectedTimeFrame)){
              time.innerHTML = `${item.timeframes[selectedTimeFrame].current}hrs`;
            }
          })
  
          previousTimeElements.forEach((time)=>{
            if (item.title === time.id){
              if(selectedTimeFrame === 'daily'){
                time.innerHTML = `Last Day - ${item.timeframes.daily.previous}hrs`

              }
              else if(selectedTimeFrame === 'weekly'){
                time.innerHTML = `Last Week - ${item.timeframes.weekly.previous}hrs`
              }
              else if(selectedTimeFrame === 'monthly'){
                time.innerHTML = `Last Month - ${item.timeframes.monthly.previous}hrs`
              }
            }
          })

        }

      })

    }
    

////
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });


