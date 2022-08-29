import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { BsX } from "react-icons/bs";
import { skill, years } from "../data/data";
import { useState } from "react";
import { AiOutlinePlus, AiFillExclamationCircle } from "react-icons/ai";

export default function DialogSkill({ addAbility }) {
  const [open, setOpen] = useState(false);
  const [ability, setAbility] = useState("");
  const [age, setAge] = useState("");
  const [skillErro, setSkillErro] = useState(false);
  const [yearErro, setYearErro] = useState(false);

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeAbility = (event) => {
    setAbility(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClose = (event) => {
    event.preventDefault();
    ability === "" ? setSkillErro(true) : setSkillErro(false);
    age === "" ? setYearErro(true) : setYearErro(false);
    if (
      yearErro === false ||
      skillErro === false ||
      ability !== "" ||
      age !== ""
    ) {
      addAbility(ability, age);
      setAbility("");
      setAge("");
    }
  };

  return (
    <div>
      <button className="border-none" onClick={handleClickOpen}>
        + Add
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="flex justify-between">
            <h1> Add Skill </h1>
            <button onClick={handleClose}>
              <BsX />
            </button>
          </div>
          <p className="mt-2 mr-20 opacity-75 text-sm">
            All fields with * are required
          </p>
          <form className="p-1 ">
            <label className="flex flex-col mt-4 text-xs">
              Skills*
              <select
                className={
                  skillErro
                    ? "border-solid border border-red-600 p-1"
                    : "border-solid border p-1"
                }
                required
                value={ability}
                onChange={handleChangeAbility}
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                {skill.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </select>
              {skillErro && (
                <p className="text-red-600 text-xs flex">
                  <AiFillExclamationCircle className="relative top-[2px]" /> Add
                  your skill{" "}
                </p>
              )}
            </label>
            <label className="flex flex-col mt-4 text-xs">
              Years of experience*
              <select
                required
                className={
                  yearErro
                    ? "border-solid border border-red-600 p-1"
                    : "border-solid border p-1"
                }
                value={age}
                onChange={handleChangeAge}
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                {years.map((y) => (
                  <option value={y}>{y}</option>
                ))}
              </select>
              {yearErro && (
                <p className="text-red-600 text-xs flex">
                  <AiFillExclamationCircle className="relative top-[2px]" /> Add
                  your year of experience{" "}
                </p>
              )}
            </label>
            <DialogActions>
              <button
                onClick={handleAddClose}
                className="rounded-full p-3 bg-[#56C870] mr-[-5px] m-3"
              >
                <AiOutlinePlus />
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}