import IconChat from "../../img/icon-chat.png"
import IconMoney from "../../img/icon-money.png"
import IconSecurity from "../../img/icon-security.png"
import Hero from "../../components/Hero/Hero"
import FeatureItem from "../../components/FeatureItem/FeatureItem"

export default function Home() {
    document.title = "Argent Bank - Home Page"

    const featureData = [
        {
            src: `${IconChat}`,
            alt: "chat icon",
            title: "You are our #1 priority",
            text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
        },
        {
            src: `${IconMoney}`,
            alt: "money icon",
            title: "More savings means higher rates",
            text: "The more you save with us, the higher your interest rate will be!",
        },
        {
            src: `${IconSecurity}`,
            alt: "security icon",
            title: "Security you can trust",
            text: "We use top of the line encryption to make sure your data and money is always safe.",
        },
    ]

    return (
        <main>
            <Hero />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featureData.map(({ src, alt, title, text }) => (
                    <FeatureItem
                        key={title}
                        src={src}
                        alt={alt}
                        title={title}
                        text={text}
                    />
                ))}
            </section>
        </main>
    )
}