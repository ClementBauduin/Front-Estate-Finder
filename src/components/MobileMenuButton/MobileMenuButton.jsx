import  Style from './MobileMenuButton.module.css'

export default function MobileMenuButton(props) {
  const { toggle } = props

  return (
    <>
        <div className={Style.HamburgerButton} onClick={toggle}>
          <span></span>
        </div>
        
    </>
  )
}
