// import '../App.css';
import { useState, useEffect } from 'react';

function AppForm() {
    const [query, setQuery] = useState('');
    const [tuote, setTuote] = useState([]);
    const [nimi, setNimi] = useState('');
    const [tyyppivalinta, setSelection] = useState("0");
    const [valmistaja, setValmistaja] = useState('');
    const [tyypit, setTyypit] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch("http://localhost:3001/tuotetyyppi");
            let kaikkitiedot = await response.json();
            let customer_types = kaikkitiedot.data;
            console.log(customer_types);
            setTyypit(customer_types);
            console.log(tyypit);
        }
        fetchData();
    }, []);

    let types = tyypit.map((t, i) => {
        return <option key={i} value={t.id}>{t.nimi}</option>
    })

    useEffect(() => {
        const fetchData = async () => {
            setSearching(true);
            let response = await fetch("http://localhost:3001/tuote" + query);
            // console.log(await response.json());
            let kaikkitiedot = await response.json();
            console.log(kaikkitiedot.data);
            setTuote(await kaikkitiedot.data);
            setSearching(false);
            console.log(tuote);
        }
        fetchData();
    }, [query]);

    const handleSubmit = (event) => {
        let search = "";
        if (nimi !== "") {
            search = "nimi=" + nimi;
        }

        if (valmistaja !== "") {
            if (search !== 0) {
                search = search + "&valmistaja=" + valmistaja;
            }
            else {
                search = "valmistaja=" + valmistaja;
            }
        }

        if (tyyppivalinta !== "0") {
            if (search !== 0) {
                search = search + "&tuotetyyppi=" + tyyppivalinta;
            }
            else {
                search = "tuotetyyppi" + tyyppivalinta;
            }
        }

        setQuery("?" + search);
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td>Nimi</td>
                            <td><input type="text" onChange={(e) => setNimi(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Valmistaja</td>
                            <td><input type="text" onChange={(e) => setValmistaja(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Hae dataa" />
                <select onChange={(e) => setSelection(e.target.value)} >
                    <option selected value={0}>Valitse</option>
                    {types}
                </select>
            </form>

            <Tuotteet tuote={tuote} searching={searching} len={tuote.length}/>

        </div>
    )
}

// Tällä muodostetaan Asiakkaat-elementti
const Tuotteet = (props) => {
    const tuotteet = props.tuote.map((s, i) => {
        return (
            <tr key={i}>
                <td>{s.nimi}</td>
                <td>{s.valmistaja}</td>
                {/* <td>{s.postinumero}</td>
                <td>{s.postitoimipaikka}</td>
                <td>{s.puhelinnro}</td> */}
                <td>{s.selite}</td>
                <td>{s.hinta}</td>
            </tr>
        )
    })

    return (
        props.searching ?
            <p>Loading ...</p> :
            props.len > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Nimi</th>
                            <th>Valmistaja</th>
                            {/* <th>Postinumero</th>
                            <th>Postitoimipaikka</th>
                            <th>Puhelinnro</th> */}
                            <th>Luokittelu</th>
                            <th>Hinta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuotteet}
                    </tbody>
                </table>
                :
                <p>Annetuilla hakuehdoilla ei löytynyt dataa</p>
    )
}

export default AppForm;
