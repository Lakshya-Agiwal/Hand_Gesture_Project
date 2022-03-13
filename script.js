// https://teachablemachine.withgoogle.com/models/AzROgx3zv/
var speech_recognition = window.webkitSpeechRecognition;
var recognition = new speech_recognition();

function voice_output()
{
textbox.innerHTML="";
recognition.start()
}
recognition.onresult=function(event){
    console.log(event);
    content=event.results[0][0].transcript;
    
    
    
}
Webcam.set({
    height:300,
    width:300,
    image_format:'png',
    png_quality:90
})
Webcam.attach("#camera");
function capture()
{
    Webcam.snap(function(data_uri){
       document.getElementById("image").innerHTML ="<img id='captured' src='"+data_uri+"'>" ;
    });
   
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/AzROgx3zv/model.json" , modelReady)
function modelReady()
{
    console.log(ml5.version);
}


function check()
{
    img = document.getElementById("captured");
    classifier.classify(img,gotResult);
    
}
function gotResult(error , result)
{
    if (error)
    {
        console.log(error);
    }
    else 
    {
      console.log(result);
        var p1 = result[0].label;
        function speak()
            {
               var synth = window.speechSynthesis;
                var speak_data = "The Prediction Is:"+p1;
              var utter_this = new SpeechSynthesisUtterance(speak_data);
                 synth.speak(utter_this);
                 
}
        speak();
        document.getElementById("p_1").innerHTML = p1;
        
        if (p1 == 'best')
        {
            document.getElementById("emoji").innerHTML = '&#128077;'
            document.getElementById("quota").innerHTML = "All the Best";
        }
        else if (p1 == 'amazing')
        {
            document.getElementById("emoji").innerHTML = '&#128076;';
            document.getElementById("quota").innerHTML = "This looks amazing";
        }
        else if (p1 == 'victory')
        {
            document.getElementById("emoji").innerHTML = '&#9996;';
            document.getElementById("quota").innerHTML = "This was a marvelous victory";
        }
        


        
        
    }
}



    
