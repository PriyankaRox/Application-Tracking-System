import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ show }) {
  const [showSidebar, setShowSidebar] = useState("");
  const userSidebar = async () => {
    try {
      const authuserString = await localStorage.getItem("authuser");
      const auth = JSON.parse(authuserString);
      console.log(auth);
      if (auth.userType && auth.userType === "2") {
        setShowSidebar("2");
      } else {
        console.log(auth.userType);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userSidebar();
  }, []);

  return (
    <div className="col-auto px-0">
      <div className={`collapse collapse-horizontal border-end ${show}`}>
        {/* <div class="sidebar" > */}
        <div className=" sidebar-nav list-group border-0 rounded-0 text-sm-start min-vh-100">
          <div className="sidebar-header hr">
            <i class="bi bi-app-indicator"></i>HR Portal{" "}
          </div>
          <div className="sidemenu-contents">
            <ul className="list-unstyled ps-0">
              <li className="sidebar-menu-group">
                <div className="collapsed sidebar-menu">
                  <NavLink to="/">
                    <i className="bi bi-house-door-fill mr-rg"></i>
                    Dashbaord
                  </NavLink>
                </div>
              </li>
              {showSidebar !== "2" && (
                <li className="sidebar-menu-group">
                  <div
                    className="collapsed sidebar-menu "
                    data-bs-toggle="collapse"
                    data-bs-target="#home-collapse"
                    aria-expanded="true"
                  >
                    <i class="bi bi-emoji-smile-fill mr-rg"></i>
                    Spak Team
                  </div>

                  <div className="collapse" id="home-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li>
                        <div className={`sidebar-submenu`}>
                          <NavLink to="/view-employee">
                            <i className="bi bi-people-fill mr-rg"></i>
                            Team
                          </NavLink>
                        </div>
                      </li>

                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/add-employee">
                            <i class="bi bi-node-plus-fill mr-rg"></i>
                            Add New Member
                          </NavLink>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              <li className="sidebar-menu-group">
                <div
                  className="collapsed sidebar-menu "
                  data-bs-toggle="collapse"
                  data-bs-target="#employee-collapse"
                  aria-expanded="true"
                >
                  <i className="bi bi-person-badge mr-rg"></i>
                  Candidates
                </div>
                <div className="collapse" id="employee-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <div className="sidebar-submenu">
                        <NavLink to="/candidate-list">
                          <i className="bi bi-card-list mr-rg"></i>
                          Candidate List
                        </NavLink>
                      </div>
                    </li>
                    {showSidebar !== "2" && (
                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/add-candidate">
                            <i className="bi bi-person-plus-fill mr-rg"></i>
                            Add candidate
                          </NavLink>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              {showSidebar === "2" && (
                <li className="sidebar-menu-group">
                  <div
                    className="collapsed sidebar-menu "
                    data-bs-toggle="collapse"
                    data-bs-target="#referral-collapse"
                    aria-expanded="true"
                  >
                    <i class="bi bi-person-plus-fill mr-rg"></i>
                    Referral
                  </div>
                  <div className="collapse" id="referral-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/add-referral">
                          <i class="bi bi-box-arrow-up-right mr-rg"></i>
                            Add Referral
                          </NavLink>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {showSidebar === "2" && (
                <li className="sidebar-menu-group">
                <div className="collapsed sidebar-menu">
                  <NavLink to="/Dev-resume-screening">
                  <i class="bi bi-search mr-rg"></i>
                    Resume screening
                  </NavLink>
                </div>
              </li>
              )}
              {showSidebar !== "2" && (
                <li className="sidebar-menu-group">
                  <div
                    className="collapsed sidebar-menu "
                    data-bs-toggle="collapse"
                    data-bs-target="#job-collapse"
                    aria-expanded="true"
                  >
                    <i className="bi bi-send-check-fill mr-rg"></i>
                    Jobs
                  </div>
                  <div className="collapse" id="job-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/view-card-new-job">
                            <i className="bi bi-receipt mr-rg"></i>
                            Active Jobs
                          </NavLink>
                        </div>
                      </li>
                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/inactive-jobs">
                            <i className="bi bi-exclamation-triangle-fill mr-rg"></i>
                            In-Active Jobs
                          </NavLink>
                        </div>
                      </li>
                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/pause-jobs">
                            <i className="bi bi-caret-right-square-fill mr-rg"></i>
                            Jobs on hold
                          </NavLink>
                        </div>
                      </li>
                      <li>
                        <div className="sidebar-submenu">
                          <NavLink to="/add-new-job">
                            <i className="bi bi-plus-circle-fill mr-rg"></i>
                            Add New Jobs
                          </NavLink>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {/* <li className="sidebar-menu-group">
                <div className="collapsed sidebar-menu">
                  <NavLink to="/report">
                    <i className="bi bi-house-door-fill mr-rg"></i>
                    Report
                  </NavLink>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
