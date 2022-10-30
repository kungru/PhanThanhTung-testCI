import { useEffect,useState } from "react";

import './App.css';
//bai1 bai 1 bai 2 console.log
let A1 = [1, 2, "a",'c','d']; let A2 = [1, 3, "b",'d']
const att=A1.concat(A2);
const tung=[]
for (let i=0;i<A1.length;i++){
  for (let j=0;j<A2.length;j++){
    if (A1[i]==A2[j]){
      tung.push(A1[i]);
    }
  }
}

console.log(tung);
const ntt=att.filter((e)=>!tung.includes(e))
console.log(ntt)

//bai2
const data=[{
  name:'Arsenal',
  points:99,
  GD:45,
},
{
  name: 'Chelsea',
  points:75,
  GD:39,
},
{
  name:'Manchester United',
  points:60,
  GD:29,
},{
  name:'a',
  points:88,
  GD:20,
},
{
  name:'Liverpool',
  points:88,
  GD:39,
},{
  name:'b',
  points:88,
  GD:20,
},

]

const tyu=[...data].sort((a,b)=>{
  if (a.points>b.points) return -1;
  if (a.points<b.points) return 1;
  if (a.GD>b.GD) return -1;
  if (a.GD<b.GD) return -1;
  return 0
})
console.log(tyu)
tyu.forEach((item,i)=>{
  item.position=i+1
})
tyu.sort((a, b) => data.indexOf(a) - data.indexOf(b));
console.log('bai 2: đây là mảng hoàn thiện:' + tyu)
function App() {
  const [newData,setNewData]=useState([])
  const [isLoading,setIsLoading]=useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
 
  useEffect(()=>{
    setIsLoading(false)
    fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
    .then((res)=>{return (res.json())}).then((data)=>{
      setNewData(data.results)
      setIsLoading(true)
     

    })
  },[])

const [test1,setTest1]=useState([])
const [test2,setTest2]=useState([])
useEffect(()=>{
  if (isLoading){
    setTest1(newData[currentQuestion].incorrect_answers)
    setTest2(newData[currentQuestion].correct_answer)
  }
},[newData[currentQuestion]])
const listQuestion=test1.concat(test2)


var newListQuestion=listQuestion[Math.floor(Math.random()*listQuestion.length)]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(listQuestion)

const resetAll=()=>{
window.location.reload()
}
  return (
    <div className="App">
      {isLoading ? <>
        {showScore ? (
          <div className="form-reset">

				<div className='score-section'>
					You scored {score} out of {newData.length}
				</div>
        <button onClick={resetAll} className='btn-reset'>New questions</button>
        </div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{newData.length}
						</div>
						<div className='question-text'>{newData[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
						{ 
          
            listQuestion.map((answerOption) => (
							<button onClick={()=>{
                  if(answerOption==newData[currentQuestion].correct_answer){
                    setScore(score +1)
                    console.log(score)
                  }
                  const nextQuestion = currentQuestion + 1;
                  if (nextQuestion < newData.length) {
                    setCurrentQuestion(nextQuestion)
                  } else {setShowScore(true)}
                }
              }>{answerOption}</button>
						))
   
            }
					</div>
				</>
			)}
      </>: ''}

    </div>
  );
}

export default App;
