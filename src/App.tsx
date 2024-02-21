import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function SelectBasicExample() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");


  const [showKabupatenForm, setShowKabupatenForm] = useState(false); // State untuk mengontrol visibilitas form kedua
  const [showKecamatanForm, setShowKecamatanForm] = useState(false); // State untuk mengontrol visibilitas form kedua
  const [showKelurahanForm, setShowKelurahanForm] = useState(false); // State untuk mengontrol visibilitas form kedua

  const [data, setData] = useState([]);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);


  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');

        interface Option {
          value: string;
          label: string;
        }
          label: string; // Sesuaikan dengan tipe data yang benar untuk label

        const provinces = response.data.map((province: Option) => ({
          value: province.value,
          label: province.label,
        }));
        setData(provinces);
        setSelectedProvince(provinces[0].value);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProvinsi();
  }, []);


  const getKabupaten = (e: string) => {

    const fetchKabupaten = async () => {
      try {
        console.log("response s: ", e)

        const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/regencies/' + e + '.json');
        interface Kabupaten {
          id: string;
          name: string;
        }

        const kabupatens = response.data.map((kabupaten: Kabupaten) => ({
          value: kabupaten.id,
          label: kabupaten.name,

        }));

        setDataKabupaten(kabupatens);
        setSelectedKabupaten(kabupatens[0].value);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchKabupaten();
  };

  const getKecamatan = (e: string) => {
    console.log("responsee : ", e)
    const fetchKecamatan = async () => {
      try {
        console.log("response s: ", e)

        const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/districts/' + e + '.json');
        interface Kecamatan {
          id: string;
          name: string;
        }
        const kecamatans = response.data.map((kecamatan: Kecamatan) => ({
          value: kecamatan.id,
          label: kecamatan.name,

        }));

        setDataKecamatan(kecamatans);
        setSelectedKecamatan(kecamatans[0].value);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchKecamatan();
  };

  const getKelurahan = (e: string) => {
    const fetchKelurahan = async () => {
      try {
        console.log("response s: ", e)

        const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/villages/' + e + '.json');
        interface Kelurahan {
          id: string;
          name: string;
        }
        const kelurahans = response.data.map((kelurahan: Kelurahan) => ({
          value: kelurahan.id,
          label: kelurahan.name,

        }));
        console.log("kelurahans : ", kelurahans)

        setDataKelurahan(kelurahans);
        setSelectedKelurahan(kelurahans[0].value);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchKelurahan();
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    getKabupaten(e.target.value);
    setShowKabupatenForm(true); // Menampilkan form kedua setelah memilih provinsi
  };

  const handleKabupatenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKabupaten(e.target.value);
    getKecamatan(e.target.value);
    setShowKecamatanForm(true); // Menampilkan form kecamatan setelah memilih kabupaten/kota
  };

  const handleKecamatanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKecamatan(e.target.value);
    getKelurahan(e.target.value);
    setShowKelurahanForm(true); // Menampilkan form kedua setelah memilih provinsi
  };

  const handleKelurahanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKelurahan(e.target.value);

    //setShowKelurahanForm(true); // Menampilkan form kedua setelah memilih provinsi
  };
  return (
    <div className="container">
      <div className="select-container">
        <div className="select-label">Pilih Provinsi
          <Form.Select className="form-select" aria-label="Default select example" value={selectedProvince} onChange={handleProvinceChange}>
            {data.map((items) => (
              <option key={items.value} value={items.value}>{items.label}</option>
            ))}
          </Form.Select>
        </div>
        {showKabupatenForm && (
          <div className="select-label">Pilih Kab/kota
            <Form.Select className="form-select" aria-label="Default select example" value={selectedKabupaten} onChange={handleKabupatenChange}>
              {dataKabupaten.map((items) => (
                <option key={items.value} value={items.value}>{items.label}</option>
              ))}
            </Form.Select>
          </div>

        )}
        {showKecamatanForm && (
          <div className="select-label">Pilih Kecamatan
            <Form.Select className="form-select" aria-label="Default select example" value={selectedKecamatan} onChange={handleKecamatanChange}>
              {dataKecamatan.map((items) => (
                <option key={items.value} value={items.value}>{items.label}</option>
              ))}
            </Form.Select>
          </div>
        )}
        {showKelurahanForm && (
          <div className="select-label">Pilih Kelurahan
            <Form.Select className="form-select" aria-label="Default select example" value={selectedKelurahan} onChange={handleKelurahanChange}>
              {dataKelurahan.map((items) => (
                <option key={items.value} value={items.value}>{items.label}</option>
              ))}
            </Form.Select>
          </div>
        )}
      </div>
    </div>
  );
}
export default SelectBasicExample;
