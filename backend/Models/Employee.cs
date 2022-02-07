namespace backend.Models
{
    public class Employee : BaseEntity
    {
        public Employee(string name, string address, string devision, int phone)
        {
            this.Name = name;
            this.Address = address;
            this.Devision = devision;
            this.Phone = phone;
        }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Devision { get; set; }
        public int Phone { get; set; }
    }
}