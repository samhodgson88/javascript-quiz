const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let AvailableQuestions = []

let questions = [
    {
        question: 'what is 2 + 2?',
        choice1: '4',
        Choice2: '7',
        Choice3: '9',
        Choice4: '21',
        answer: 1,
    },
    {
        question: 'what is 2 + 5?',
        choice1: '2',
        Choice2: '7',
        Choice3: '9',
        Choice4: '21',
        answer: 2, 
    },
    {
        question: 'what is 3 + 6?',
        choice1: '2',
        Choice2: '7',
        Choice3: '9',
        Choice4: '21',
        answer: 3,   
    },
    {
        question: 'what is 20 + 1?',
        choice1: '2',
        Choice2: '7',
        Choice3: '9',
        Choice4: '21',
        answer: 4, 
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(AvailableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}`

    const questionsIndex = math.floor(math.random() * availableQuestions.length)
    currentQuestion = AvailableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    AvailableQuestions.splice(questionsIndex,1)
    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';

    if(classToApply === 'correct'){
        incrementScore(SCORE_POINTS)
    }

     selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
    },1000)
 })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
