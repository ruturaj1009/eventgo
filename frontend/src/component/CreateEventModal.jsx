import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateEventModal = ({ showModal, setShowModal, fetchData }) => {
  const [formData, setFormData] = useState({
    title: "",
    ticketPrice: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    image_link: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      // Convert value and currentDate to Date objects for comparison
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      // Check if the selected date and time is not earlier than the current date and time
      if (selectedDate < currentDate) {
        toast.error("Please select a date and time after the current date and time.");
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };
  

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("img", selectedFile);

      const response = await axios.post(
        "http://localhost:6060/api/v1/users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Image Uploaded Successfully");
        const imageLink = response.data.data;
        setFormData((prevState) => ({ ...prevState, image_link: imageLink }));
      } else {
        toast.error("Failed to upload image. Try again");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const handleCreateEvent = () => {
    const userData = {
      ...formData,
      organizer: "663f304a27f7c26170bd5581",
    };
    console.log(userData);
    axios
      .post("http://localhost:6060/api/v1/events/", userData)
      .then((response) => {
        toast.success("Event created successfully");
        setFormData({
          title: "",
          ticketPrice: "",
          description: "",
          startDate: "",
          endDate: "",
          location: "",
          image_link: "",
        });
        setShowModal(false);
        fetchData();
      })
      .catch((error) => {
        toast.error("Failed to create event");
        console.error(error);
      });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 16);
    setFormData((prevState) => ({
      ...prevState,
      startDate: currentDate,
      endDate: currentDate,
    }));
  }, []);

  return (
    <>
      {showModal && <div className="modal-backdrop show"></div>}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Event</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "auto" }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Ticket Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Start Date and Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date and Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={uploadFile}
                    disabled={!selectedFile}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateEvent}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEventModal;
