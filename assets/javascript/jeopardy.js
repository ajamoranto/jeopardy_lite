(function() {
  //declaring variables
  let i = 0;
  let animalsCounter = 0;
  let tvCounter = 0;
  let foodCounter = 0;
  let score = 0;
  let points = 0;
  let realAnswer;
  let iD;
  let question = $("#question");
  let category = $("#category");
  let value = $("#value");
  let showScore = $("#score");
  let jumbo = $('.jumbotron');
  let content = $('#content');
  let img = $('#alex');
  let categories = $('.categories');

  //adding design
  categories.css({
    "padding": "20px"
  })

  jumbo.css({
    "background-color": "#060CE9",
    "color": "white",
    "font-size": "30px",
    "text-align": "center",
    "height": "300px",
    "background-image": "url(http://jservice.io/assets/trebek-503ecf6eafde622b2c3e2dfebb13cc30.png",
    "background-repeat": "no-repeat",
    "font-family": "'Crimson Text', serif",
    "letter-spacing": ".5px",
    "text-shadow": "2px 2px black"
  })
  content.css({
    "text-align": "center",
  })

  //Pulls next question depending on category/button press and clears text field
  //Changes color back to blue on new question if previous answer was incorrect
  let nextQuestion = function() {

    $('#answerField').val("")
    jumbo.css({
      "background-color": "#060CE9"
    })

    $.get("http://jservice.io/api/clues?category=" + iD, function(data) {
      question.html(data[i].question.toUpperCase())
      category.html("Category is: " + data[i].category.title.toUpperCase())
      value.html("For " + data[i].value + " points")

      realAnswer = data[i].answer.toLowerCase();
      points = data[i].value;
    })
  }

  //Adds or subracts score
  let addScore = function() {
    //Function below would loop after each additional button press
    //Added unbind to prevent looping
    //Background color changes to red on incorrect answer
    $("#answer").unbind("click").click(function() {

      let answer = $('#answerField').val().toLowerCase();

      if (answer == realAnswer) {
        score += points;
        showScore.html("Score: " + score);
        alert("You're correct! Pick another category")
      } else {
        console.log(realAnswer)
        jumbo.css("background-color", "red");
        score -= points;
        showScore.html("Score: " + score);
        alert("Wrong! Pick another category")
      }
    })
  }

  //Has ID for category and specific animal counter
  $("#animals").click(function() {
    iD = "21";
    i = animalsCounter;
    nextQuestion();
    addScore();
    animalsCounter++;
  })

  //Has ID for category and specific tv counter
  $("#television").click(function() {
    iD = "67";
    i = tvCounter;
    nextQuestion();
    tvCounter++;
  })

  //Has ID for category and specific food counter
  $("#food").click(function() {
    iD = "49";
    i = foodCounter;
    nextQuestion();
    foodCounter++;
  })
})()
