import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Input, Spinner } from "reactstrap";
import { ValidateField } from "../helpers/ValidationHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetAPIUrl, clearUserDetails, getUserAuth } from "../helpers/Lookup";
import ThrobbleHelper from "../helpers/ThrobbleHelper";

function PageContentsAdmin() {

  document.title = "EM :: Page Content Admin"
  const [formData, setFormData] = useState({
    _id: 0,
    Title: "",
    MetaData: "",
  });

  const [Pages, setPages] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (id) => {
    const bearer = "Bearer " + getUserAuth();
    ThrobbleHelper.show("Loading Page Contents");
    try {
      const response = await fetch(GetAPIUrl("pagecontents"), {
        method: "GET",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.length > 0) {
          let page = null;

          if (id) page = data.find((c) => c._id === id);
          else page = data[0];
          setFormData({ ...page });
        }
        setPages(data);
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
      console.log(e);
      ThrobbleHelper.hide();
    }
  };

  const savePageContent = async (evt) => {
    evt.preventDefault();

    let isValid = true;
    isValid &= ValidateField(formData.Title, "errTitle", "* Required");
    isValid &= ValidateField(formData.MetaData, "errCopy", "* Required");

    if (isValid) {
      ThrobbleHelper.show("Saving Page Content");
      try {
        const bearer = "Bearer " + getUserAuth();
        let Url = GetAPIUrl("pagecontents");
        let response = null;
        if (formData._id) {
          response = await fetch(Url + "/" + formData._id, {
            method: "PUT",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        } else {
          response = await fetch(Url, {
            method: "POST",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        }

        if (response && response.ok) {
          const data = await response.json();
          loadData(data._id);
          ThrobbleHelper.hide();
          toast.success("Page content was successfully saved!");
        } else {
          console.log(response.status + ":", response.statusText);
          if (response.status === 401) {
            clearUserDetails();
            window.location.href = "/";
          } else {
            ThrobbleHelper.hide();
            toast.error("There was an error saving page content");
          }
        }
      } catch (e) {
        console.error(e);
        ThrobbleHelper.hide();
        toast.error("There was an error saving page content");
      }
    }
  };

  const OnItemChange = (evt) => {
    const page = Pages.find((c) => c._id === evt.target.value);
    if (page) {
      setFormData({ ...page, MetaData: page.MetaData ? page.MetaData : "" });
    }
  };

  // if (loading)
  //   return (
  //     <div className="mt-2 mb-5 pb-2">
  //       <Spinner /> Loading Page Contents
  //     </div>
  //   );

  return (
    <div>
      <h1 className="text-uppercase">Page Content Admin</h1>
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Select Item
                <span id="errItem" className="ErrorText"></span>
              </label>
              <select
                className="form-select form-select-sm"
                value={formData._id}
                onChange={OnItemChange}
              >
                {Pages.length &&
                  Pages.map((item, idx) => (
                    <option key={idx} value={item._id}>
                      {item.Title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Title
                <span id="errTitle" className="ErrorText"></span>
              </label>
              <input
                type="text"
                value={formData.Title}
                className="form-control form-control-sm"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    Title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-12">
              <label className="form-label">
                Copy
                <span id="errCopy" className="ErrorText"></span>
              </label>
              <Input
                type="textarea"
                className="form-control"
                value={formData.MetaData}
                rows={14}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    MetaData: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="text-end">
            <Button color="success" onClick={savePageContent} size="sm">
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PageContentsAdmin;
