import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", name: "", password: "" });
    const [passwordsarray, setPasswordsarray] = useState([]);

    const getpassword = async () => {
        let request = await fetch("http://localhost:3000/");
        let passwords = await request.json();
        setPasswordsarray(passwords);
    }

    useEffect(() => {
        getpassword();
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Text Copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showpassword = () => {
        passwordref.current.type = "text";
        if (ref.current.src.includes("hide.png")) {
            ref.current.src = "view.png";
            passwordref.current.type = "password";
        } else {
            ref.current.src = "hide.png";
            passwordref.current.type = "text";
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    
    const savepassword = async () => {
        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        const newId = uuidv4();
        const newPassword = { ...form, id: newId };
    
        try {
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPassword)
            });
    
            if (!response.ok) {
                throw new Error('Failed to save password');
            }
    
            setPasswordsarray([...passwordsarray, newPassword]);
            setform({ site: "", name: "", password: "" });
        } catch (error) {
            console.error('Error saving password:', error.message);
        }

    };
    

    const editPassword = async (id) => {
        // const passwordToEdit = passwordsarray.find(i => i.id === id);
        // setform({ ...passwordToEdit, id });
        setform({...passwordsarray.filter(i=>i.id===id)[0],id:id})
        setPasswordsarray(passwordsarray.filter(item => item.id !== id));
        await fetch("http://localhost:3000/",{
            "method":"DELETE",
            "headers":{
                "Content-Type":"application/json"
            },
            "body":JSON.stringify({id})
        });
    }

    const deletePassword = async (id) => {
        setPasswordsarray(passwordsarray.filter(item => item.id !== id));
        await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition="Bounce" />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className='container px-40 py-16 w-screen mx-auto text-center'>
                <h1 className='my-3'>
                    <span className='text-green-600 text-3xl font-bold '>&lt;</span><span className='font-bold text-3xl'>Pass</span><span className='text-green-600 text-3xl font-bold '>OP/</span><span className='text-green-600 text-3xl font-bold '>&gt;</span>
                </h1>
                <p className='font-bold text-green-800 py-2'>Your Own Password Manager</p>
                <div className='w-3/4 mx-auto flex flex-col items-center'>
                    <input type="text" className='w-full border border-green-600 rounded-full my-5 p-4 py-1' placeholder='Enter website URL' name='site' value={form.site} onChange={handleChange} />
                    <div className='w-full flex justify-between gap-8'>
                        <input type="text" placeholder='Enter Username' className='w-full border border-green-600 rounded-full my-5 p-4 py-1' name='name' value={form.name} onChange={handleChange} />
                        <div className='relative'>
                            <input ref={passwordref} type="password" placeholder='Enter Password' className='w-full border border-green-600 rounded-full mx- my-5 p-4 py-1' name='password' value={form.password} onChange={handleChange} />
                            <span className='absolute right-[3px] top-[24px] font-bold cursor-pointer'><img ref={ref} src="./view.png" alt="view" className='p-1' width={26} onClick={showpassword} /></span>
                        </div>
                    </div>
                    <button className='flex justify-center items-center bg-green-600 rounded-full px-2 py-2 align-center w-fit my-3' onClick={savepassword}>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>Save Password</button>
                </div>
                <div className='passwords'>
                    <h2>Your Passwords</h2>
                    {passwordsarray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordsarray.length !== 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-lg">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Website URL</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordsarray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center '><div className='flex justify-center items-center'>{item.site}<div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}><lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "10px" }} trigger="hover"></lord-icon></div></div></td>
                                        <td className='py-2 border border-white text-center '><div className='flex justify-center items-center'>{item.name}<div className='size-7 cursor-pointer' onClick={() => { copyText(item.name) }}><lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "10px" }} trigger="hover"></lord-icon></div></div></td>
                                        <td className='py-2 border border-white text-center '><div className='flex justify-center items-center'>{item.password}<div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}><lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "10px" }} trigger="hover"></lord-icon></div></div></td>
                                        <td className='py-2 border border-white text-center flex justify-evenly items-center '><span className='cursor-pointer' onClick={() => { editPassword(item.id) }}><lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon></span><span className='cursor-pointer ' onClick={() => { deletePassword(item.id) }}><lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon></span> </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager;
