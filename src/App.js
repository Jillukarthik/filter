import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "./App.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Switch from "@mui/material/Switch";

function App() {
  const [datafetch, setDatafetch] = useState([]);
  const [popup, setpopup] = useState(false);
  const [inputData, setinputData] = useState([]);
  const [operator, setOperator] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [dataShow, setDatashow] = useState(true);
  const {
    register,
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      test: [{ data: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  console.log(isValid, "fcgvhbjkhgfhjklmjhgcvbn");
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
        // console.log(output, "output");
      });
      // console.log(output, "sdsdsd");
      setfilterData(output);
    } else {
      let output = [];
      datafetch.forEach((x, dindex) => {
        inputData.forEach((item, index, arr) => {
          if (x.name.includes(item)) {
            output.push(x);
            arr.length = index + 1;
          }
        });
      });

      setfilterData(output);
    }
  };

  const toggleAdvanceSwitch = () => {
    if (fields.length === 1) {
      append();
    } else if (fields.length >= 2) {
      remove([1, 2, 3, 4, 5]);
    }
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((x) => {
      setDatafetch(x.data);
    });
  }, []);

  //filter popup
  const handleToggle = () => {
    setpopup(true);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className="filter">
      <div className="filter__header">
        <div className="filter__highlights">
          <h3>Highlights</h3>
        </div>
        <div className="filter__icons">
          <span>
            <FilterListIcon style={{ marginTop: "5px" }} />
          </span>
          <span className="filter__toggle" onClick={(e) => handleToggle(e)}>
            Filter
          </span>
          <span>
            <ArrowDropDownIcon style={{ marginLeft: "10px" }} />
          </span>
        </div>
      </div>
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
        {popup && (
          <div className="popup__filter">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={index} style={{ listStyle: "none" }}>
                      <div className="filter__inputdata">
                        <div>
                          <select
                            style={{ appearance: "none", borderRadius: "4px" }}
                            {...register("operator")}
                            className="filter__select"
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                        </div>

                        <div className="filter__field">
                          <input
                            {...register(`test.${index}.data`, {
                              required: {
                                value: true,
                                message: "required",
                              },
                            })}
                            className="filter__input"
                            placeholder="Enter highlights(min 1 character)"
                          />
                        </div>
                        <div className="filter__delete_icon">
                          {index !== 0 && (
                            <DeleteOutlineIcon onClick={() => remove(index)} />
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div></div>
              <section>
                <button
                  type="button"
                  style={{
                    position: "static",
                    marginTop: "12px",
                    backgroundColor: "#fff",
                    color: "#6f73d2",
                    border: "2px solid #dddddd",
                    width: "80px",
                    height: "30px",
                  }}
                  className={
                    (fields.length === 1 && "buttonappend__none") ||
                    (fields.length === 5 && "buttonappend__none")
                  }
                  id="filter__add"
                  onClick={() => {
                    append();
                  }}
                >
                  +add
                </button>
                <div className="filter__toggle__advance">
                  <div className="filter__toggle__switch">
                    <Switch {...label} onChange={toggleAdvanceSwitch} />
                    <span>Advanced </span>
                  </div>
                  <div>
                    <button
                      className="filter__clear"
                      onClick={() => {
                        setpopup(false);
                        remove([1, 2, 3, 4, 5]);
                      }}
                    >
                      Clear filter
                    </button>
                    <input
                      disabled={!isValid}
                      type="submit"
                      className={
                        !isValid ? "disabledfilter__apply" : "filter__apply"
                      }
                      value="Apply filter"
                    />
                  </div>
                </div>
              </section>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
