;(function () {
    //searches for an HTML element that has the id of canvas.
    // Once it finds the element, we can then manipulate it with JavaScript.
    const canvas = document.getElementById('canvas')
    //context is our toolbox of paintbrushes and shapes. 
    //The 2D context contains the set of tools we want.
    const ctx = canvas.getContext('2d')
  
  })()
  //function that is called to clear the canvas
    function clearcanvas(){
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}