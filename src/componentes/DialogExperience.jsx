import { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { BsX } from "react-icons/bs";
import {
  AiOutlineCheck,
  AiOutlineSearch,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { allSkill } from "../data/data";

export default function DialogExperience({ experiency, setExperiency }) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(experiency[0].company);
  const [job, setJob] = useState(experiency[0].job);
  const [from, setFrom] = useState(experiency[0].from);
  const [to, setTo] = useState("mm/yyyy");
  const [skill, setSkill] = useState(experiency[0].skill);
  const [search, setSearch] = useState();
  const [current, setCurrent] = useState(null);
  const [companyErro, setCompanyErro] = useState(false);
  const [jobErro, setJobErro] = useState(false);
  const [fromErro, setFromErro] = useState(false);
  const [toErro, setToErro] = useState(false);

  useEffect(() => {
    if (current === null) {
      workTo();
    }
  });

  function workTo() {
    if (experiency[0].to === "Present") {
      setCurrent(true);
    } else {
      setTo(experiency[0].to);
      setCurrent(false);
    }
  }

  function togleSkills(params, key) {
    if (key) {
      setSkill([...skill, params]);
    } else {
      let remnants = [];
      skill.forEach((s) => {
        if (s === params) {
        } else {
          remnants.push(s);
        }
      });
      setSkill(remnants);
    }
  }

  const printSkills = () => {
    return allSkill.map((s, i) => {
      if (skill.includes(s)) {
        return (
          <button
            key={i + s}
            type="button"
            onClick={() => {
              togleSkills(s, false);
            }}
          >
            <p className=" text-sm rounded-xl m-1 p-1 px-2 bg-cyan-700 text-white flex items-center ">
              {s}
              <AiOutlineCheck className="ml-2" />
            </p>
          </button>
        );
      }
      return (
        <button
          key={i + s}
          type="button"
          onClick={() => {
            togleSkills(s, true);
          }}
        >
          <p className="text-sm rounded-xl m-1 p-1 px-2 bg-blue-300 flex items-center">
            {s}
          </p>
        </button>
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function hendleError() {
    company === "" ? setCompanyErro(true) : setCompanyErro(false);
    job === "" ? setJobErro(true) : setJobErro(false);
    from === "" ? setFromErro(true) : setFromErro(false);

    let toHelper = current === false ? to : "Present";

    if (toHelper === "mm/yyyy" || toHelper !== "") {
      setToErro(true);
    } else {
      setToErro(false);
    }

    return toHelper
  }

  const handleUpdateClose = (event) => {
    event.preventDefault();
  let toHelper = hendleError();
    if (
      companyErro === false ||
      jobErro === false ||
      fromErro === false ||
      toErro === false
    ) {
      setExperiency([
        {
          company,
          job,
          from,
          to: toHelper,
          skill,
        },
      ]);
      setOpen(false);
    }
  };

  const handleCheked = () => {
    setCurrent(!current);
    setTo("mm/yyyy");
  };

  return (
    <div>
      <button
        className="flex items-center z-20 mt-2 py-1 px-2 border-solid border-black border-[1px] rounded-2xl bg-[#D9D9D9]"
        onClick={handleClickOpen}
      >
        <MdEdit />
        <p className="ml-1">Edit</p>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="flex justify-between">
            <h1> Edit Experiency </h1>
            <button onClick={handleClose}>
              <BsX />
            </button>
          </div>
          <p className="mt-2 mr-20 opacity-75 text-sm">
            All fields with * are required
          </p>
          <form className="p-1 ">
            <div className="flex mr-20 ">
              <label className="flex flex-col mt-2 mr-2 text-xs w-1/2">
                Company Name*
                <input
                  required
                  className={
                    companyErro
                      ? "border-solid border border-red-600 p-1"
                      : "border-solid border p-1"
                  }
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    hendleError();
                  }}
                />
                {companyErro && (
                  <p className="text-red-600 text-xs flex">
                    <AiFillExclamationCircle className="relative top-[2px]" />{" "}
                    This field is required{" "}
                  </p>
                )}
              </label>
              <label className="flex flex-col my-2 text-xs w-1/2 ">
                Job Title*
                <input
                  required
                  className={
                    jobErro
                      ? "border-solid border border-red-600 p-1"
                      : "border-solid border p-1"
                  }
                  value={job}
                  onChange={(e) => {
                    setJob(e.target.value);
                    hendleError();
                  }}
                />
                {jobErro && (
                  <p className="text-red-600 text-xs flex">
                    <AiFillExclamationCircle className="relative top-[2px]" />{" "}
                    This field is required{" "}
                  </p>
                )}
              </label>
            </div>
            <div className="flex items-center mr-20  ">
              <label className="flex flex-col mr-2 text-xs w-[23%]">
                From*
                <input
                  required
                  className={
                    fromErro
                      ? "border-solid border border-red-600 p-1"
                      : "border-solid border p-1"
                  }
                  value={from}
                  type="data"
                  onChange={(e) => {
                    setFrom(e.target.value);
                    hendleError();
                  }}
                />
                {fromErro && (
                  <p className="text-red-600 text-xs flex">
                    <AiFillExclamationCircle className="relative top-[2px]" />{" "}
                    Required{" "}
                  </p>
                )}
              </label>
              <label className="flex flex-col mx-2 text-xs w-[23%]">
                To*
                <input
                  required={toErro}
                  className="border-solid border p-1"
                  value={to}
                  type="data"
                  disabled={current}
                  onChange={(e) => {
                    setTo(e.target.value);
                    hendleError();
                  }}
                />
                {toErro && (
                  <p className="text-red-600 text-xs flex">
                    <AiFillExclamationCircle className="relative top-[2px]" />{" "}
                    Required{" "}
                  </p>
                )}
              </label>
              <label className="gap-1 mt-3 mr-12 flex">
                <input
                  type="checkbox"
                  className="p-1 relative top-[2px] flex"
                  checked={current}
                  onClick={handleCheked}
                />
                <p className="pl-1 text-xs"> I currente work were</p>
              </label>
            </div>
            <div>
              <h2 className="mt-4 text-sm font-bold">Choose the skills used</h2>
              <div className="flex">{printSkills()}</div>
            </div>
            {!search && (
              <AiOutlineSearch className="relative top-[25px] left-1 z-10 opacity-70" />
            )}
            <div className="flex">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full ${
                  search ? "mt-4" : "mt-0"
                }  p-1 border-solid border`}
                placeholder="     Search for Skill"
              />
            </div>
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className="rounded-full m-6 text-[#28783a] font-bold text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateClose}
            className="rounded-full bg-[#56C870] px-3 py-2 m-6 font-bold text-sm"
          >
            Updade
          </button>
        </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
