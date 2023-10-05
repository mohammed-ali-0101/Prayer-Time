

//let cities=["دمشق", "اللاذقية" ,"حمص" , "حماه" , "درعا", "الحسكة", "ديرالزور","حلب","القنيطرة","ادلب"]

let cities=[
  {
    arbName:"دمشق",
    isoNmae:"Dimashq"
  },
  {
    arbName:"حمص",
    isoNmae:"Ḩimş"
  },
  {
    arbName:"حلب",
    isoNmae:"Ḩalab"
  },
  {
    arbName:"الحسكة",
    isoNmae:"Al Ḩasakah"
  },
  {
    arbName:"حماه",
    isoNmae:"Ḩamāh"
  },
  {
    arbName:"درعا",
    isoNmae:"Dar'ā"
  },
  {
    arbName:"السويداء",
    isoNmae:"Ţarţūs"
  },
  {
    arbName:"اللاذقية",
    isoNmae:"Al Lādhiqīyah"
  },
  {
    arbName:"طرطوس",
    isoNmae:"Ţarţūs"
  },
  {
    arbName:"الرقة",
    isoNmae:"Ar Raqqah"
  },
  {
    arbName:"القنيطرة",
    isoNmae:"Al Qunayţirah"
  }
]
for(city of cities){

  let content=`<option>${city.arbName}</option>`
  document.getElementById("selCity").innerHTML+=content
}
document.getElementById("selCity").addEventListener("change" , function(){
document.getElementById("cityName").innerHTML=this.value
let cityisoname=""
for(city of cities){
    if(city.arbName==this.value){
      cityisoname=city.isoNmae
    }
  getPrayerTiming(cityisoname)
}

})


function getPrayerTiming(selectCity){
  
    let params={
      country:"SY",
      city: selectCity   
  }
  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    const timings=response.data.data.timings
    const date=response.data.data.date.gregorian.date
    const day=response.data.data.date.hijri.weekday.ar

    fillTimrForPrayer("Fajr-time" , timings.Fajr)
    fillTimrForPrayer("Sunrise-time" , timings.Sunrise)
    fillTimrForPrayer("Dhuhr-time" , timings.Dhuhr)
    fillTimrForPrayer("Asr-time" , timings.Asr)
    fillTimrForPrayer("Maghrib-time" , timings.Maghrib)
    fillTimrForPrayer("Isha-time" , timings.Isha)

    document.getElementById("readable").innerHTML=day+" "+date
  

    console.log(document.getElementById("selCity").innerHTML.valueOf)
    
  })
  .catch(function (error) {
    console.log(error);
  })
}
  function fillTimrForPrayer(id , time){
    document.getElementById(id).innerHTML=time
  }
  getPrayerTiming("Dimashq");