// import '../App.css';
import { useState, useEffect } from 'react';

function AppForm() {
    const [query, setQuery] = useState('');
    const [asiakas, setAsiakas] = useState([]);
    const [nimi, setNimi] = useState('');
    const [tyyppivalinta, setSelection] = useState("0");
    const [osoite, setOsoite] = useState('');
    const [tyypit, setTyypit] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch("http://localhost:3001/asiakastyyppi");
            let kaikkitiedot = await response.json();
            let customer_types = kaikkitiedot.data;
            console.log(customer_types);
            setTyypit(customer_types);
            console.log(tyypit);
        }
        fetchData();
    }, []);

    let types = tyypit.map((t, i) => {
        return <option key={i} value={t.AVAIN}>{t.SELITE}</option>
    })

    useEffect(() => {
        const fetchData = async () => {
            setSearching(true);
            let response = await fetch("http://localhost:3001/asiakas" + query);
            // console.log(await response.json());
            let kaikkitiedot = await response.json();
            console.log(kaikkitiedot.data);
            setAsiakas(await kaikkitiedot.data);
            setSearching(false);
            console.log(asiakas);
        }
        fetchData();
    }, [query]);

    const handleSubmit = (event) => {
        let search = "";
        if (nimi !== "") {
            search = "nimi=" + nimi;
        }

        if (osoite !== "") {
            if (search !== 0) {
                search = search + "&osoite=" + osoite;
            }
            else {
                search = "osoite=" + osoite;
            }
        }

        if (tyyppivalinta !== "0") {
            if (search !== 0) {
                search = search + "&asty_avain=" + tyyppivalinta;
            }
            else {
                search = "asty_avain=" + tyyppivalinta;
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
                            <td>Osoite</td>
                            <td><input type="text" onChange={(e) => setOsoite(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Hae dataa" />
                <select onChange={(e) => setSelection(e.target.value)} >
                    <option selected value={0}>Valitse</option>
                    {types}
                </select>
            </form>

            <Asiakkaat asiakas={asiakas} searching={searching} len={asiakas.length}/>

        </div>
    )
}

// Tällä muodostetaan Asiakkaat-elementti
const Asiakkaat = (props) => {
    const asiakkaat = props.asiakas.map((s, i) => {
        return (
            <tr key={i}>
                <td>{s.NIMI}</td>
                <td>{s.OSOITE}</td>
                {/* <td>{s.postinumero}</td>
                <td>{s.postitoimipaikka}</td>
                <td>{s.puhelinnro}</td> */}
                <td>{s.AVAIN}</td>
                <td>{s.SELITE}</td>
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
                            <th>Osoite</th>
                            {/* <th>Postinumero</th>
                            <th>Postitoimipaikka</th>
                            <th>Puhelinnro</th> */}
                            <th>tyyppi_id</th>
                            <th>tyyppi_selite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asiakkaat}
                    </tbody>
                </table>
                :
                <p>Annetuilla hakuehdoilla ei löytynyt dataa</p>
    )
}

export default AppForm;
