import React from "react";

function DocumentModal(props) {
  const { idx, document, docu } = props;
  const edit = () => {
    docu(document);
  };
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{document.date}</td>
      <td>{document.title}</td>
      <td>{document.description}</td>
      <td>
        <div className="img-vid-box">
          <img src={document.document} alt="artist-img" />
        </div>
      </td>
      <td>
        <div className="edit-icon">
          <a
            data-toggle="modal"
            data-target="#editDocumentModal"
            onClick={edit}
            className="white mr-10"
          >
            <i className="icon mdi mdi-pencil" />
          </a>
          <a href="/" className="white mr-10">
            <i className="icon mdi mdi-eye" />
          </a>
        </div>
      </td>
    </tr>
  );
}

export default DocumentModal;
