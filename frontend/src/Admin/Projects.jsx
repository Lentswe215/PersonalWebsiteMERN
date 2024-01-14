import React, { useEffect, useState } from "react";
import { GetAPIUrl, GetServerPath, clearUserDetails, getUserAuth } from "../helpers/Lookup";
import ThrobbleHelper from "../helpers/ThrobbleHelper";
import { Button, ButtonGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ValidateField } from "../helpers/ValidationHelper";
import { toast } from "react-toastify";
import { ConfirmHelper } from "../helpers/ConfrmHelper";
import Select from "react-select"
import ImageUpload from "./ImageUpload";

function ProjectsAdmin() {

  document.title = "EM :: Projects Admin";

  const FormObj = {
    _id: "",
    Name: "",
    Image: "",
    LinkUrl: "",
    SkillsUsed: [],
  };

  const [EditModal, setEditModal] = useState(false);
  const [FormData, setFormData] = useState(FormObj);
  const [Projects, setProjects] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const toggleModal = () => {
    setEditModal(!EditModal);
  }

  const loadData = async () => {
    ThrobbleHelper.show("Loading Projects");
    const Authorization = "Bearer " + getUserAuth();

    try {
      const SkillsResponse = await fetch(GetAPIUrl("skills"), {
        method: "GET",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });

      if (SkillsResponse.ok) {
        const data = await SkillsResponse.json();
        let skills = data.sort((a, b) => a.Name - b.Name).reduce((skills, skill) => {
          const ddItem = { label: skill.Name, value: skill._id };
          if (skills)
            skills.push(ddItem);
          else
            skills = [ddItem];
          return skills;
        }, [])
        setSkills(skills);
      } else {
        if (SkillsResponse.status === 401) {
          clearUserDetails();
          window.location.href = "/login";
        }
      }
    } catch (e) {
      console.error(e);
    }

    try {
      const response = await fetch(GetAPIUrl("projects"), {
        method: "GET",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        ThrobbleHelper.hide();
      } else {
        if (response.status === 401) {
          clearUserDetails();
          window.location.href = "/login";
        } else {
          ThrobbleHelper.hide();
        }
      }
    } catch (e) {
      console.error(e);
      ThrobbleHelper.hide();
    }
  };

  const EditProject = (Id) => {
    if (Id) {
      const project = Projects.find(c => c._id === Id);
      setFormData({ _id: project._id, Name: project, LinkUrl: project.LinkUrl, SkillsUsed: JSON.parse(project.SkillsUsed), Image: project.ImageUpload });
    } else {
      setFormData({ _id: "", Name: "", LinkUrl: "", SkillsUsed: [], Image: "" });
    }

    setEditModal(true);
  }

  const DeleteProject = (Id) => {
    console.log("Dele", Id);
  }

  const OnImageSelect = (imgData) => {
    setFormData((prevData) => {
      return { ...prevData, Image: imgData }
    });
  }

  const saveItem = (evt) => {
    evt.preventDefault();
    let isValid = true;
    isValid &= ValidateField(FormData.Name, "errName", "* Required");
    isValid &= ValidateField(FormData.LinkUrl, "errLink", "* Required");
    isValid &= ValidateField(FormData.SkillsUsed.length, "errSkills", "* Required");
    if (isValid)
      SaveData();
  }

  const SaveData = async () => {
    toggleModal();
    ThrobbleHelper.show("Saving Project");

    const data = { ...FormData, SkillsUsed: JSON.stringify(FormData.SkillsUsed) };
    try {
      console.log("Tryr:", data)
      const Authorization = "Bearer " + getUserAuth();
      const response = await fetch(GetAPIUrl("projects"), {
        method: FormData._id === "" ? "POST" : "PUT",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        loadData();
        ThrobbleHelper.hide();
        toast.success("The project was successfully saved");
      } else {
        console.log(response.status, ":", response.statusText)
        if (response.status === 401) {
          clearUserDetails();
          window.location.href = "/login";
        } else {
          ThrobbleHelper.hide();
          toast.error("There was an error saving the project");
        }
      }
    } catch (e) {
      console.error(e);
      ThrobbleHelper.hide();
      toast.error("There was an error saving the project");
    }
  }

  const GetTableRows = () => {
    if (Projects.length > 0)
      return (
        Projects.map((item, idx) =>
          <tr key={idx}>
            <td>
              {item.Name}
              <br />
              {/* {console.log("Ddds", item.Image)} */}
              {item.Image && <img src={GetServerPath() + item.Image} alt={item.Name} className="img-fluid" style={{ width: "150px" }} />}
            </td>
            <td>
              {item.LinkUrl}
            </td>
            <td>
              {item.Skills && <ul>{JSON.parse(item.Skills).map(item => <li>{item}</li>)}</ul>}
            </td>
            <td>
              <ButtonGroup>
                <Button color="dark" outline onClick={e => { e.stopPropagation(); EditProject(item._id); }}><i className="fa fa-edit"></i></Button>
                <Button color="dark" outline onClick={e => { e.stopPropagation(); DeleteProject(item._id); }}><i className="fa fa-trash-alt text-danger"></i></Button>
              </ButtonGroup>
            </td>
          </tr>)
      )
    else {
      return (
        <tr>
          <td className="text-center" colSpan={4}>No Projects available. Please use the "Add Project" button to start</td>
        </tr>
      )
    }
  }

  return (
    <>
      <div className="row my-4">
        <div className="col-md-6">
          <h1>Project Administrator</h1>
        </div>
        <div className="col-md-6 text-end align-self-end">
          <Button color="primary" size="sm" type="button" onClick={() => EditProject()}><i className="fa fa-plus-circle me-2"></i>Add Project</Button>
        </div>
        <div className="col-12 mt-3">
          <table className="table table-striped table-bordered table-sm w-100">
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
                <th>Skills</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {GetTableRows()}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={EditModal} fade backdrop>
        <ModalHeader toggle={toggleModal} close={<button className="btn-close" onClick={toggleModal}></button>}>Edit Project</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="">Name
              <span id="errName" className="ErrorText"></span>
            </label>
            <Input type="text" bsSize="sm" value={FormData.Name} onChange={e => {
              setFormData((prevData) => {
                return { ...prevData, Name: e.target.value };
              });
              ValidateField(e.target.value, "errName", "* Required");

            }} />
          </div>
          <div className="mb-3">
            <label htmlFor="">Link Url
              <span id="errLink" className="ErrorText"></span>

            </label>
            <Input type="text" bsSize="sm" value={FormData.LinkUrl} onChange={e => {
              setFormData((prevData) => {
                return { ...prevData, LinkUrl: e.target.value };
              })
              ValidateField(e.target.value, "errLink", "* Required");
            }} />

          </div>
          <div className="mb-3">
            <label htmlFor="">Skills Used
              <span id="errSkills" className="ErrorText"></span>
            </label>
            <Select
              isMulti
              defaultValue={() => Skills.filter(c => FormData.SkillsUsed.includes(c.value))}
              options={Skills}
              onChange={e => {
                const skills = e.reduce((skills, selectedItem) => { skills.push(selectedItem.value); return skills; }, []);
                setFormData(prevData => {
                  return { ...prevData, SkillsUsed: skills };
                })

                ValidateField(skills.length, "errSkills", "* Required");

              }}
              closeMenuOnSelect={false}
            />
          </div>
          <div className="mb-3">
            <ImageUpload Label={"Image"} DefaultImage={FormData.Image} Width={300} Height={300} OnImageSelected={OnImageSelect} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" size="sm" onClick={toggleModal}><i className="fal fa-times-circle me-2"></i>Close</Button>
          <Button color="success" size="sm" onClick={saveItem}><i className="fal fa-check-circle me-2"></i>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProjectsAdmin;
