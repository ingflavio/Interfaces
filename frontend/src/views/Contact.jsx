export const Contact = () => {
  return (
    <>
      <div
        className="modal fade bgdivPrimary"
        id="templatemo_search"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close bgbuttonPalette"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-white"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container-fluid bgdivPrimary py-5">
        <div className="col-md-6 m-auto text-center">
          <h1 className="h1">Contact Us</h1>
          <p>
            Proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum. Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
      <div className="container py-5">
        <div className="row py-5">
          <form className="col-md-9 m-auto" method="post" role="form">
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="inputname">Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="name"
                  name="name"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="inputemail">Email</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputsubject">Subject</label>
              <input
                type="text"
                className="form-control mt-1"
                id="subject"
                name="subject"
                placeholder="Subject"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputmessage">Message</label>
              <textarea
                className="form-control mt-1"
                id="message"
                name="message"
                placeholder="Message"
                rows="8"
              ></textarea>
            </div>
            <div className="row">
              <div className="col text-end mt-2">
                <button type="submit" className="btn bgbuttonPalette btn-lg px-3">
                  Let’s Talk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
