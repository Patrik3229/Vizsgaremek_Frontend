import '../css/MainPage.scoped.css'

export function MainPage() {
    return <div className='row'>
        <h1>Welcome to our page!</h1>
        <p>This is a website which you can upload, view, rate and even comment on recipes! Start browsing now!</p><br />
        <h4>Authors:</h4>
        <ul style={{paddingLeft: '40px'}}>
            <li>Elekes Fanni</li>
            <li>Fecske Márk</li>
            <li>Kovács Patrik</li>
        </ul>
    </div>
}