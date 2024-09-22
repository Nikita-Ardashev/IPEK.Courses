namespace IPEK.Courses.Server.Domain.Entities.BaseEntities
{
    public class BaseComplitedTaskGeneric<T> : BaseComplitedTask
    {
        public virtual T Task { get; set; }
    }
}
