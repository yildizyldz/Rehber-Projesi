import { useEffect, useState } from "react";
import axios from "axios";
import viteLogo from "/vite.svg";
import { TbSearch } from "react-icons/tb";
import { CiMenuBurger } from "react-icons/ci";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { AiOutlineUserAdd } from "react-icons/ai";
import Card from "./components/Card";
import { GrConsole } from "react-icons/gr";
import Modal from "./components/Modal";
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [Contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  useEffect(() => {
    // ! Sayfa yüklendiğinde api'dan verileri al
    axios.get("/contact").then((res) => setContacts(res.data));
  }, []);

  // form gonderıldıgınde calısacak fonksıyon
  const handleSubmit = (e) => {
    // sayfa yeneılemesını engelle
    e.preventDefault();
    // input içerısndekı degere eriş
    const text = e.target[1].value;
    // apı a gonderılcek parametrelerı belırle

    const params = {
      q: text,
    };
    // inputtan alına deger netıcesınde ılgılı verıyı api'dan al
    axios.get("/contact", { params }).then((res) => setContacts(res.data));
  };
  // ! Sil butonuna tıklanınca ilgili kişiyi silen fonksiyon
  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek istediğinizden eminmisiniz ?");

    if (res) {
      // Api dan id'si bilinen kullanıcıyı silsin
      axios
        .delete(`/contact/${id}`)
        .then(() => {
          // Silinen kişiyi state'den kaldır
          const updated = Contacts.filter((contact) => contact.id !== id);
          setContacts(updated);
        })
        .catch((err) => {
          alert("Silme işlemi sırasında bir hata oluştu !!");
          alert(err);
        });
    }
  };

  // ! Güncelle ikonuna tıklayınca ilgili kişi verisinini güncelleyecek fonksiyon

  const handleEdit = (contact) => {
    //  Modal'ı Aç
    setIsModelOpen(true);

    // Güncellenecek kişiyi state e aktar
    setEditItem(contact);
  };

  return (
    <div className="app">
      {/* header*/}
      <header>
        <h1>Rehber</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <TbSearch />
            </button>
            <input type="text" placeholder="kişi aratınız..." />
          </form>
          <button className="ns">
            <CiMenuBurger />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModelOpen(true)} className="add">
            <AiOutlineUserAdd />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      <div>
        {/*maın */}
        <main>
          {Contacts.map((contact) => (
            <Card
              key={contact.id}
              contact={contact}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </main>
        {/* Modal */}
        <Modal
          isModelOpen={isModelOpen}
          setIsModelOpen={setIsModelOpen}
          setContacts={setContacts}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      </div>
    </div>
  );
}

export default App;
