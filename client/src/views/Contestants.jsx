import ContestantCard from "../components/ContestantCard";

const Contestants = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-teal text-3xl font-bold mb-4">Contestants</h1>
            <div className="grid grid-cols-4 gap-y-16 gap-x-[80px]">
                <ContestantCard name="Corey Anderson" link="/contestants/1" avatarUrl="/src/images/1.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/2" avatarUrl="/src/images/2.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/3" avatarUrl="/src/images/3.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/4" avatarUrl="/src/images/4.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/5" avatarUrl="/src/images/5.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/6" avatarUrl="/src/images/6.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/7" avatarUrl="/src/images/7.jpg" />
                <ContestantCard name="Corey Anderson" link="/contestants/8" avatarUrl="/src/images/1.jpg" />
            </div>
        </div>
    )
}

export default Contestants;