import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "./App.css";

function App() {
  const [datafetch, setDatafetch] = useState([]);
  const [popup, setpopup] = useState(false);
  const[inputData,setinputData]=useState([]);
  const[operator,setOperator]=useState('')
  const[filterData,setfilterData]=useState([]);
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
 

 
  

  const onSubmit = (data) =>{ 
  console.log(data)
  let arr=[]
  data.test.map((x)=>{
    arr.push(x.data)
    setinputData(arr)
  })
  setOperator(data.operator);
  handlefilter()
  }
 
// console.log(operator);
// console.log(inputData);

const handlefilter=()=>{
if(!operator){
  setfilterData(datafetch)
  console.log("heyy")
}
 else if(operator=="AND"){
  console.log("and")
    let arr1=datafetch.filter((x,i)=>{
     
      x.name.includes(inputData[i])
    })
    setfilterData(arr1)
     console.log("1", setfilterData(arr1))
  }
  else{
    console.log("or")
    let arr2=datafetch.filter((x,i)=>x.name.includes(inputData[i]))
    // setfilterData(datafetch)
    console.log("2,",arr2)
  }
}

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((x) => {
      setDatafetch(x.data);
      // console.log(x.data);
    });
  }, []);

  //filter popup
  const handleToggle = () => {
    setpopup(true);
  };

  return (
    <div className="app">
      <div className="border">
        {filterData
        // .filter((x) => {
        //   if (inputData.length==0) {
        //     return x;
        //   } else if (inputData.includes(x.body)) {
        //     // input1.toLowerCase().includes(x.title.toLowerCase()))
        //     return x;
        //   }
        // })
        .map((x) => (
          <>
            <div className="data" key={x.id}>
              <p>postId:{x.postId}</p>
              <p>name:{x.body}</p>
              <p>email:{x.email}</p>
            </div>
          </>
        ))}
      </div>
      <div >
        <p className="app__filter" onClick={(e) => handleToggle(e)}>filter</p>
        {popup && (
          <div className="popup__filter">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <select {...register("operator")}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                      <input
                        {...register(`test.${index}.data`, { required: true })}
                      />

                      <button type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
              <section>
                <button
                  type="button"
                  onClick={() => {
                    append();
                  }}
                >
                  append
                </button>
              </section>

              <input type="submit" />
            </form>
            <button
              onClick={() => {
                setpopup(false);
              }}
            >
              clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
