import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "./App.css";

function App() {
  const [datafetch, setDatafetch] = useState([]);
  const [popup, setpopup] = useState(false);
  const [inputData, setinputData] = useState([]);
  const [operator, setOperator] = useState("");
  const [filterData, setfilterData] = useState([]);
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data) => {
    console.log(data);
    let cleanData = data.test.map((x) => x.data);
    setinputData(cleanData);
    setOperator(data.operator);
    handlefilter();
  };

  // console.log(operator);
  // console.log(inputData);
  // let output = [];

  const handlefilter = () => {
    if (!operator) {
      setfilterData(datafetch);
      // console.log("heyy")
    } else if (operator == "OR") {
      console.log("and");
      let output=[]

       datafetch.forEach((x) => {
          
        // console.log(x.name)
        inputData.forEach((item) => {
          console.log(item, "ïtem")
      
          if (x.name.includes(item)) {
            output.push(x);
            // break;
            // return x
          }
        });

        console.log(output, "output")

      });


      console.log(output, "sdsdsd");
      setfilterData(output);
    } else {
      // console.log("or");
      let arr2 = datafetch.filter((x, i) => x.name.includes(inputData[i]));
      // setfilterData(datafetch)
    }
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((x) => {
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
        {filterData.map((x) => (
          <>
            <div className="data" key={x.id}>
              <p>postId:{x.username}</p>
              <p>name:{x.name}</p>
              <p>email:{x.email}</p>
            </div>
          </>
        ))}
      </div>
      <div>
        <p className="app__filter" onClick={(e) => handleToggle(e)}>
          filter
        </p>
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
                  className={fields.length === 5 && "buttonappend__none"}
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
