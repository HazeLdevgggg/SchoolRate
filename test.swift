import SwiftUI

struct HighSchool: Identifiable {
    let id = UUID()
    let rank: Int
    let name: String
    let votes: Int
}

struct RankingView: View {
    @State private var showingConfirmation = false
    @State private var selectedSchool: HighSchool?
    @State private var searchQuery = ""
    @State private var isFullListDisplayed = false
    @State private var timeRemaining = 0 // Temps restant avant de pouvoir revoter
    @State private var timer: Timer? // Timer pour mettre à jour le temps restant
    
    let maxDisplayedSchools = 10 // Nombre maximal de lycées affichés initialement
    let loadMoreThreshold = 10 // Seuil pour afficher le bouton "Load More"
    let voteCooldown = 30 // Délai de refroidissement en secondes
    
    @State private var canVote = true // Booléen pour déterminer si l'utilisateur peut voter ou non
    
    let highSchools: [HighSchool] = [
        HighSchool(rank: 1, name: "Lycée A", votes: 150),
        HighSchool(rank: 2, name: "Lycée B", votes: 120),
        HighSchool(rank: 3, name: "Lycée C", votes: 100),
        HighSchool(rank: 4, name: "Lycée D", votes: 80),
        HighSchool(rank: 5, name: "Lycée E", votes: 70),
        HighSchool(rank: 6, name: "Lycée F", votes: 65),
        HighSchool(rank: 7, name: "Lycée G", votes: 60),
        HighSchool(rank: 8, name: "Lycée H", votes: 55),
        HighSchool(rank: 9, name: "Lycée I", votes: 50),
        HighSchool(rank: 10, name: "Lycée J", votes: 45),
        HighSchool(rank: 11, name: "Lycée K", votes: 40),
        HighSchool(rank: 12, name: "Lycée L", votes: 35),
        HighSchool(rank: 13, name: "Lycée M", votes: 30),
        HighSchool(rank: 14, name: "Lycée N", votes: 25),
        HighSchool(rank: 15, name: "Lycée O", votes: 20),
        HighSchool(rank: 16, name: "Lycée P", votes: 15),
        HighSchool(rank: 17, name: "Lycée Q", votes: 10),
        HighSchool(rank: 18, name: "Lycée R", votes: 5),
        HighSchool(rank: 19, name: "Lycée S", votes: 3),
        HighSchool(rank: 20, name: "Lycée T", votes: 1)
    ]
    
    var filteredSchools: [HighSchool] {
        if searchQuery.isEmpty {
            return highSchools
        } else {
            return highSchools.filter { $0.name.lowercased().contains(searchQuery.lowercased()) }
        }
    }
    
    var body: some View {
        VStack(spacing: 20) {
            TextField("Rechercher un lycée", text: $searchQuery)
                .padding()
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .frame(maxWidth: .infinity)
            
            List(filteredSchools.prefix(isFullListDisplayed ? filteredSchools.count : maxDisplayedSchools)) { highSchool in
                HStack {
                    Text("\(highSchool.rank)")
                        .padding(.trailing, 10)
                    Text("\(highSchool.name) - \(highSchool.votes) votes")
                }
                .onTapGesture {
                    if canVote {
                        self.selectedSchool = highSchool
                        self.showingConfirmation = true
                        startCooldown()
                    } else {
                        // Afficher le pop-up avec le temps restant
                        self.showingConfirmation = false
                        self.showTimeRemainingPopup()
                    }
                }
            }
            .listStyle(PlainListStyle())
            .padding()
            if filteredSchools.count > maxDisplayedSchools && !isFullListDisplayed {
                Text("Load More...")
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .cornerRadius(10)
                    .onTapGesture {
                        self.isFullListDisplayed.toggle()
                    }
                    .padding(.horizontal)
            }
        }

        .alert(isPresented: $showingConfirmation) {
            Alert(
                title: Text("Êtes-vous sûr de vouloir voter pour \(selectedSchool?.name ?? "") ?"),
                message: nil,
                primaryButton: .cancel(),
                secondaryButton: .default(Text("Voter")) {
                    // Code pour voter
                }
            )
        }
    }
    
    func startCooldown() {
        canVote = false // Désactiver la possibilité de voter
        timeRemaining = voteCooldown
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
            if timeRemaining > 0 {
                timeRemaining -= 1
            } else {
                timer?.invalidate()
                canVote = true // Activer à nouveau la possibilité de voter
            }
        }
    }
    
    func showTimeRemainingPopup() {
        let remainingTimeString = String(format: "%02d:%02d", timeRemaining / 60, timeRemaining % 60)
        let alertMessage = "Vous pourrez revoter dans : \(remainingTimeString)"
        
        let alertController = UIAlertController(title: "Temps de refroidissement", message: alertMessage, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        
        UIApplication.shared.windows.first?.rootViewController?.present(alertController, animated: true, completion: nil)
    }
}

struct ContentView: View {
    var body: some View {
        TabView {
            NavigationView {
                RankingView()
            }
            .tabItem {
                Image(systemName: "list.bullet")
                Text("Classement")
            }
            
            Text("Autre onglet")
                .tabItem {
                    Image(systemName: "square.and.pencil")
                    Text("Autre")
                }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

.

extension View {
    func navigationBarColor(backgroundColor: UIColor, tintColor: UIColor) -> some View {
        self.modifier(NavigationBarColor(backgroundColor: backgroundColor, tintColor: tintColor))
    }
}

struct NavigationBarColor: ViewModifier {
    var backgroundColor: UIColor
    var tintColor: UIColor
    
    init(backgroundColor: UIColor, tintColor: UIColor) {
        self.backgroundColor = backgroundColor
        self.tintColor = tintColor
        
        let coloredAppearance = UINavigationBarAppearance()
        coloredAppearance.configureWithOpaqueBackground()
        coloredAppearance.backgroundColor = backgroundColor
        coloredAppearance.titleTextAttributes = [.foregroundColor: UIColor.black]
        coloredAppearance.largeTitleTextAttributes = [.foregroundColor: UIColor.black]
        
        UINavigationBar.appearance().standardAppearance = coloredAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = coloredAppearance
        UINavigationBar.appearance().tintColor = tintColor
    }
    
    func body(content: Content) -> some View {
        ZStack {
            content
                .background(Color(UIColor.systemBackground).edgesIgnoringSafeArea(.all))
                .onAppear {
                    UINavigationBar.appearance().barTintColor = self.backgroundColor
                }
                .onDisappear {
                    UINavigationBar.appearance().barTintColor = nil
                }
        }
    }
}
