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
  const [dataShow, setDatashow] = useState(true);
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
    setDatashow(false);
  };

  // console.log(operator);
  // console.log(inputData);
  // let output = [];

  const handlefilter = () => {
    if (operator == "OR") {
      console.log("or");
      let output = [];
      datafetch.forEach((x) => {
        inputData.forEach((item) => {
          console.log(item, "ïtem");
          if (x.name.includes(item)) {
            output.push(x);
          }
        });
        console.log(output, "output");
      });
      console.log(output, "sdsdsd");
      setfilterData(output);
    } else {
      let output = [];
      datafetch.forEach((x) => {
        inputData.forEach((item, index, arr) => {
          if (x.name.includes(item)) {
            output.push(x);
            arr.length = index + 1;
          }
        });
      });

      setfilterData(output);
      console.log("AND");
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
    <div className="filter">
      <div className="filter__border">
        {dataShow
          ? datafetch.map((x) => (
              <>
                <div className="filter__data" key={x.id}>
                  <p>postId:{x.username}</p>
                  <p>name:{x.name}</p>
                  <p>email:{x.email}</p>
                </div>
              </>
            ))
          : filterData.map((x) => (
              <>
                <div className="filter__data" key={x.id}>
                  <p>postId:{x.username}</p>
                  <p>name:{x.name}</p>
                  <p>email:{x.email}</p>
                </div>
              </>
            ))}
      </div>
      <div>
        <p className="filter__toggle" onClick={(e) => handleToggle(e)}>
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
                remove([1, 2, 3, 4, 5]);
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
