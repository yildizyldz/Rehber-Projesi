import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineAttachEmail } from "react-icons/md";
const Card = ({ contact, handleDelete, handleEdit }) => {
  if (!contact || !contact.name) {
    return <p>Yükleniyor...</p>; // Eğer contact yoksa, hata almamak için bir şeyler döndürelim
  }
  const [name, surname] = contact.name.split(" ");
  return (
    <div className="card">
      {/* Buttons */}
      <div className="buttons">
        <button onClick={() => handleEdit(contact)}>
          <RiEdit2Fill />
        </button>
        <button onClick={() => handleDelete(contact.id)}>
          <MdDeleteForever />
        </button>
      </div>
      {/* Name profıl  */}
      <h1>
        {name ? name[0] : ""} {surname ? surname[0] : ""}
      </h1>
      <h3>{contact.name} </h3>
      <p>{contact.positon || "Pozisyon Bilgisi Yok"}</p>
      <p>{contact.company || "Şirket Bilgisi Yok"}</p>
      {/* Bottom  */}
      <div className="bottom">
        <div>
          <span>
            <BiPhoneCall />
          </span>
          <span>{contact.phone || "Telefon Yok"}</span>
        </div>
        <div>
          <span>
            <MdOutlineAttachEmail />
          </span>
          <span>{contact.email || "E-posta Yok"}</span>
        </div>
      </div>
    </div>
  );
};
export default Card;
