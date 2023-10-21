import React from "react";

function AdminFooter() {
  return (
    <footer className="mt-3 pt-2 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center align-self-center">
            Ephraim Mamonong &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
