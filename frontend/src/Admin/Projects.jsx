import React, { useEffect, useState } from "react";
import { GetAPIUrl, clearUserDetails, getUserAuth } from "../helpers/Lookup";
import ThrobbleHelper from "../helpers/ThrobbleHelper";

function ProjectsAdmin() {
  const [Projects, setProjects] = useState([]);
  const [Skills, setSkills] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

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
        const skills = await SkillsResponse.json();
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

  return (
    <div>
      <h1>Project Administrator</h1>
      <div className="mt-3">
        <table className="table table-striped table-bordered table-sm w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ProjectsAdmin;
