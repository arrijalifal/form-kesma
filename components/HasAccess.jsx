import { capitalize, golonganUkt, listMatkul } from "@/lib/data";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";
import axios from "axios";

export default function HasAccess({datafile}) {
  const router = useRouter();
  const { data: session } = useSession();
  const database = datafile.data
  const { nrp, kontak, semester } = database.datadiri;
  const {
    golongan_ukt,
    pekerjaan_ayah,
    pendapatan_ayah,
    pekerjaan_ibu,
    pendapatan_ibu
  } = database.ekonomi;
  const { sks_tempuh, sks_lulus, matkul_mengulang } = database.akademik;
  const matkul = listMatkul();
  const formik = useFormik(
    {
      initialValues: {
        nrp,
        kontak,
        semester,
        golongan_ukt,
        pekerjaan_ayah,
        pendapatan_ayah,
        pekerjaan_ibu,
        pendapatan_ibu,
        sks_tempuh,
        sks_lulus,
        matkul_mengulang
      },
      onSubmit: async (value) => {
        console.log(value);
        const newData = {
          datadiri: {
            nrp: value.nrp,
            kontak: value.kontak,
            semester: value.semester,
          },
          ekonomi: {
            golongan_ukt: value.golongan_ukt,
            pekerjaan_ayah: value.pekerjaan_ayah,
            pendapatan_ayah: value.pendapatan_ayah,
            pekerjaan_ibu: value.pekerjaan_ibu,
            pendapatan_ibu: value.pendapatan_ibu,
          },
          akademik: {
            sks_tempuh: value.sks_tempuh,
            sks_lulus: value.sks_lulus,
            matkul_mengulang: value.matkul_mengulang
          }
        }
        await axios({
          method: 'patch',
          url: "http://localhost:3000/api/deta/updateData",
          data: {
            key: session.user.email,
            data: {
              data: newData
            }
          }
        });
        router.push('/');
      }
    },
  );
  return (
    <>
      <h1 className="text-2xl mb-5">Edit Data</h1>
      <section>
        <form onSubmit={formik.handleSubmit}>
          <fieldset className="mb-10 datadiri">
            {
              Object.keys(database.datadiri).map(dt => {
                const keys = dt.split("_")
                  .map(k => (capitalize(k)) ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1))
                  .join(" ");
                return (
                  <React.Fragment key={dt}>
                    <p>{keys}</p>
                    {
                      <input
                        id={dt}
                        type={(dt === "semester") ? 'number' : 'text'}
                        name={dt}
                        className="border border-gray-400 rounded-md outline-blue-400 p-2 mb-3 w-full"
                        value={formik.values[dt]}
                        onChange={formik.handleChange}
                        disabled={(dt === 'nrp')}
                        min={(dt === "semester") ? 1 : null}
                        max={(dt === "semester") ? 14 : null}
                      />
                    }
                  </React.Fragment>
                )
              })
            }
          </fieldset>
          <fieldset className="mb-10 ekonomi">
            {
              Object.keys(database.ekonomi).map(dt => {
                const keys = dt.split("_").map(k => (capitalize(k)) ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1)).join(" ");
                return (
                  <React.Fragment key={dt}>
                    <p>{keys}</p>
                    {
                      (dt.split("_")[0] === "pendapatan" || dt.split("_")[0] === "golongan") ?
                        <select
                          id={dt}
                          name={dt}
                          className="border border-gray-400 rounded-md outline-blue-400 p-2 mb-3 w-full"
                          value={formik.values[dt]}
                          onChange={formik.handleChange}
                        >
                          {
                            Array.from({ length: 7 }, (_, index) => {
                              const golongan = `golongan_${index}`;
                              return (
                                <React.Fragment key={index}>
                                  <option value={golongan}>{golonganUkt(golongan)}</option>
                                </React.Fragment>
                              )
                            })
                          }
                        </select> :
                        <input
                          id={dt}
                          type="text"
                          name={dt}
                          className="border border-gray-400 rounded-md outline-blue-400 p-2 mb-3 w-full"
                          value={formik.values[dt]}
                          onChange={formik.handleChange}
                        />
                    }
                  </React.Fragment>
                )
              })
            }
          </fieldset>
          <fieldset className="mb-10 akademik">
            {
              Object.keys(database.akademik)
                .filter(e => e !== "matkul_mengulang")
                .map(dt => {
                  const keys = dt.split("_")
                    .map(k => (capitalize(k)) ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1))
                    .join(" ");
                  return (
                    <React.Fragment key={dt}>
                      <p>{keys}</p>
                      {
                        <input
                          id={dt}
                          type="text"
                          name={dt}
                          className="border border-gray-400 rounded-md outline-blue-400 p-2 mb-3 w-full"
                          value={formik.values[dt]}
                          onChange={formik.handleChange}
                          disabled={(dt === 'nrp')}
                        />
                      }
                    </React.Fragment>
                  )
                })
            }
          </fieldset>
          <fieldset className="mb-10 matkulmengulang">
            <p>Mata Kuliah Mengulang</p>
            {
              Object.keys(matkul).map((mk, idx) => {
                return (
                  <React.Fragment key={(mk) ? mk : idx}>
                    <div className="flex items-center my-2">
                      <input
                        type="checkbox"
                        id="matkul_mengulang"
                        name="matkul_mengulang"
                        value={mk}
                        onChange={formik.handleChange}
                        defaultChecked={(matkul_mengulang) ? matkul_mengulang.includes(mk) : false}
                        className="w-4 h-4 mr-2"
                      /> <span className="">{matkul[mk]}</span>
                    </div>
                  </React.Fragment>
                )
              })
            }
          </fieldset>
          <div className="text-center">
            <button
              type="submit"
              className="border-2 border-slate-50 bg-blue-600 text-gray-50 px-3 py-2 rounded-md text-center"
            >
              Simpan
            </button>
          </div>
        </form>
      </section>
    </>
  )
}