import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "./App.css";

function App() {
  const [datafetch, setDatafetch] = useState([]);
  const [popup, setpopup] = useState(false);
  const[inputData,setinputData]=useState([]);
  const[operator,setOperator]=useState('')
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",

  });
 

 
  

  const onSubmit = (data) =>{ 
  console.log(data)
  data.test.map((x)=>{
    
    setinputData(inputData=>[...inputData,x.data])
  })
  setOperator(data.operator);
  }
 
console.log(operator);
console.log(inputData);

// const handlefilter=()=>{
//   if()
// }





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
        {datafetch
        .map((x) => (
          <>
            <div className="data" key={x.id}>
              <p>postId:{x.postId}</p>
              <p>name:{x.name}</p>
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
