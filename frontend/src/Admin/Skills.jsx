import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { GetAPIUrl, clearUserDetails, getUserAuth } from "../helpers/Lookup";
import ThrobbleHelper from "../helpers/ThrobbleHelper";
import Select from "react-select";
import { ValidateField } from "../helpers/ValidationHelper";
import { toast } from "react-toastify";
import { ConfirmHelper } from "../helpers/ConfrmHelper";

function SkillsAdmin() {

  document.title = "EM :: Skills Admin"

  const FormObj = {
    _id: 0,
    Name: "",
    Type: 0,
  };

  const [EditModal, setEditModal] = useState(false);
  const [FormData, setFormData] = useState(FormObj);
  const [Skills, setSkills] = useState([]);
  const SkillTypes = [
    { label: "-Select - ", value: 0 },
    { label: "Frontend", value: 1 },
    { label: "Backend", value: 2 },
    { label: "Other", value: 3 },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const toggle = () => {
    setEditModal(!EditModal);
  };

  const loadData = async () => {
    ThrobbleHelper.show("Loading Skills");
    try {
      const Authorization = "Bearer " + getUserAuth();

      const response = await fetch(GetAPIUrl("skills"), {
        method: "GET",
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Opd", data);
        setSkills(data);
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

  const GetTypeName = (TypeId) => {
    return SkillTypes.find((c) => c.value == TypeId)?.label;
  };

  const EditSkill = (id) => {
    const skill = Skills.find((c) => c._id === id);
    if (skill) setFormData({ ...skill });
    else setFormData(FormObj);
    toggle();
  };

  const SaveSkill = async () => {
    let isValid = true;
    isValid &= ValidateField(FormData.Name, "errName", "* Required");
    isValid &= ValidateField(FormData.Type, "errType", "* Required");

    if (isValid) {
      toggle();
      ThrobbleHelper.show("Saving Skill");
      try {
        const Authorization = "Bearer " + getUserAuth();
        const response = await fetch(GetAPIUrl("skills"), {
          method: "POST",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        });

        if (response.ok) {
          loadData();
          ThrobbleHelper.hide();
          toast.success("The skill was successfully saved");
        } else {
          if (response.status === 401) {
            clearUserDetails();
            window.location.href = "/login";
          } else {
            ThrobbleHelper.hide();
            toast.error("There was an error saving the skill");
          }
        }
      } catch (e) {
        console.error(e);
        ThrobbleHelper.hide();
        toast.error("There was an error saving the skill");
      }
    }
  };

  const DeleteSkill = (id) => {
    console.log("dod", id);
    ConfirmHelper("Delete Skill", "skill", async () => {
      try {
        ThrobbleHelper.show("Deleting skill");
        const Authorization = "Bearer " + getUserAuth();
        const response = await fetch(GetAPIUrl("skills") + "/" + id, {
          method: "DELETE",
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          loadData();
          ThrobbleHelper.hide();
          toast.success("The skill was successfully deleted!");
        } else {
          if (response.status === 401) {
            clearUserDetails();
            window.location.href = "/login";
          } else {
            ThrobbleHelper.hide();
            toast.error("There was an error deleting the skill");
          }
        }
      } catch (e) {
        console.error(e);
        ThrobbleHelper.hide();
        toast.error("There was an error deleting the skill");
      }
    });
  };

  return (
    <div className="my-4">
      <div className="row">
        <div className="col-md-6">
          <h1>Skills Administrator</h1>
        </div>
        <div className="col-md-6 text-end align-self-end">
          <Button color="primary" size="sm" onClick={() => EditSkill()}>
            <i className="fa fa-plus-circle me-2"></i>Add Skill
          </Button>
        </div>
        <div className="col-12 mt-4">
          <table className="table table-sm table-bordered table-striped w-100">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {Skills.map((item) => (
                <tr key={item._id}>
                  <td>{item.Name}</td>
                  <td>{GetTypeName(item.Type)}</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => EditSkill(item._id)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => DeleteSkill(item._id)}
                      >
                        <i className="fa fa-trash text-danger"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={EditModal} fade>
        <ModalHeader
          toggle={toggle}
          close={
            <button type="button" className="btn-close" onClick={toggle} />
          }
        >
          Edit Skill
        </ModalHeader>
        <ModalBody>
          <div className="col-12 mb-3">
            <label>
              Name
              <span id="errName" className="ErrorText" />
            </label>
            <Input
              bsSize="sm"
              type="text"
              value={FormData.Name}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, Name: e.target.value };
                });
                ValidateField(e.target.value, "errName", "* Required");
              }}
            />
          </div>
          <div className="col-12">
            <label>
              Type
              <span id="errType" className="ErrorText" />
            </label>
            <Select
              options={SkillTypes}
              isClearable={false}
              isSearchable={false}
              value={SkillTypes.find((c) => c.value === FormData.Type)}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, Type: e.value };
                });
                ValidateField(e.value, "errType", "* Required");
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} size="sm">
            Close
          </Button>
          <Button color="primary" onClick={SaveSkill} size="sm">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SkillsAdmin;
