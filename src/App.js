import React, { Component } from 'react'
import './App.css'
// import 'three-little-pigs.jpeg' from './assets/three-little-pigs.jpeg';

class App extends Component {
  constructor(props) {
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "alpha through yummy squeal queen fry",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)


      let vowelsArray = currentWord.split("").filter(vowel => {
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      })
      console.log("vowelsArray:", vowelsArray)

      let u = currentWord.indexOf(vowelsArray[0])
      let q = currentWord.indexOf("q")

      // Y condition no vowels
      // no vowels but has the letter <y> , anything before the <y> gets shifted to right
      // add <ay>

      if (vowelsArray.length === 0 && currentWord.indexOf("y") > 0){
        let yIndex = currentWord.indexOf("y")
        let firstFragment = currentWord.slice(yIndex)
        let endFragment = currentWord.slice(0,yIndex)
        console.log(`${firstFragment}${endFragment}ay`)
        return `${firstFragment}${endFragment}ay`
      }
      
      // Consonant condition:
      //    split the words at the first vowel and have the letters before the vowel, shift the end
      //    of the same word.
      //    shift the consonants to the end of the word when no vowel in index 0
      //    add the <ay>  
      //    pineapple with expected output :  ineapple-p-ay .... vowelsArray = [i, e, a, e,] 

      if (currentWord.indexOf(vowelsArray[0]) > 0 && (u - q) !== 1) {
        let firstVowel = currentWord.indexOf(vowelsArray[0]);
        let endFragment = currentWord.slice(0,firstVowel);
        let firstFragment = currentWord.slice(firstVowel);

        console.log (`${firstFragment}${endFragment}ay`)
        return currentWord = `${firstFragment}${endFragment}ay`
      }

      // Vowel condition
      //    when the vowel is in the index = 0 leave as is
      //    add <way>
      //    if the first character is a vowel, then take the whole word and 

      if (currentWord.indexOf(vowelsArray[0]) === 0) {
          console.log (`${currentWord}way`)
          return `${currentWord}way`
      }
      // 
      // QU condition
      //    if <qu> shift, including the u, to the en of the word
      //    add <ay>
      //    filter

      if ((u - q) === 1){
        let firstFrag = currentWord.slice(u + 1)
        let endFragment = currentWord.slice(0, u + 1)
        console.log (`${firstFrag}${endFragment}ay`)
        return `${firstFrag}${endFragment}ay`
             }

      // Remember: console.log is your friend :)

      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return currentWord
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({ phraseTranslated: translatedWords })
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "alpha through yummy squeal queen fry",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({ phrase: e.target.value })
  }

  render() {
    return (
      <>
        <h1>Pig Latin Translator</h1>
        <img
          src="https://oakhouseschool.com/wp-content/uploads/2018/12/three-little-pigs.jpg"
          alt="pig with butcher cut names in pig latin"
          className="butcherPig"
        />
        <div className="inputArea">
          <h4>Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        <p>{this.state.phraseTranslated}</p>
        <footer>Coded by Salvador, Frank, and Mikka</footer>
      </>
    )
  }
}

export default App
