import { useContext, useEffect } from "react"
import PreviewComponent from "../../components/previews/preview"
import { inputStyles } from "../../components/styles/input"
import { layoutStyles } from "../../components/styles/layout"
import { textStyles } from "../../components/styles/textStyles"
import Button from "../../components/ui/buttons/button"
import Header from "../../components/ui/header"
import Loader from "../../components/ui/loader"
import PageControlLinks from "../../components/ui/sidebar/pageLinks"
import { FollioContext } from "../../context/follioContext"
import PageHead from "../../pageHead"

const Settings = () => {
    const { checkIsLoggedIn, setUsername, username, cv, handleMediaFiles, setCv, favIcon, showLoader, updateUsername, uploadResume, uploadPageLoader, uploadFavicon } = useContext(FollioContext)

    useEffect(() => {
        checkIsLoggedIn()
    })

    if (showLoader) return <Loader />

    return <div>
        <Header />
        <PageHead title="Follio - Settings" />
        <div className={layoutStyles.main}>
            <div className={layoutStyles.previewMainWrapper}>
                <div className="hidden lg:block"><PageControlLinks /></div>
                <div className="w-full max-w-xl">
                    <p className={layoutStyles.textLg}>Settings</p>
                    <div>
                        <div className={layoutStyles.container}>
                            <p className={textStyles.label}>Change your username</p>
                            <input className={inputStyles.input} value={username} onChange={e => setUsername(e.target.value)} placeholder={username} />
                            <Button action={updateUsername} full={false} label='Change your username' />
                        </div>
                        <div className='m-16' />
                        <div className={layoutStyles.container}>
                            <p className={textStyles.label}>Upload your resume {cv ? <a target='_blank' className="text-brand" href={cv} rel="noreferrer">[view]</a> : null} </p>
                            <input
                                className={inputStyles.fileInput}
                                accept=".pdf, .doc, .docx, .rtf, .txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                type='file'
                                onChange={e => {
                                    handleMediaFiles(e.target.files[0], 'cv')
                                }}
                                placeholder={username} />
                            <Button action={uploadResume} full={false} label='Upload' />
                        </div>
                        <div className='m-16' />
                        <div className={layoutStyles.container}>
                            <p className={textStyles.label}>Custom page loader</p>
                            <p className='mb-5 mt-2 opacity-40'>Can be a gif or any other image format</p>
                            <input
                                className={inputStyles.fileInput}
                                accept="image/*, .gif"
                                type='file'
                                onChange={e => {
                                    handleMediaFiles(e.target.files[0], 'loader')
                                }}
                                placeholder={username} />
                            <Button action={uploadPageLoader} full={false} label='Upload' />
                        </div>
                        <div className='m-16' />
                        <div className={layoutStyles.container}>
                            <p className={textStyles.label}>Page favicon {favIcon ? <a target='_blank' className="text-brand" href={favIcon} rel="noreferrer">[view]</a> : null} </p>
                            <p className='mb-5 mt-2 opacity-40'>Add an image that shows up in the title bar of your browser</p>
                            <input
                                className={inputStyles.fileInput}
                                accept=".ico"
                                type='file'
                                onChange={e => {
                                    handleMediaFiles(e.target.files[0], 'fav-icon')
                                }}
                                placeholder={username} />
                            <Button action={uploadFavicon} full={false} label='Upload' />
                        </div>
                    </div>
                </div>
                <PreviewComponent />
            </div>
        </div>
    </div >
}

export default Settings