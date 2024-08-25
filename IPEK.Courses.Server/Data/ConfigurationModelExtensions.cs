using IPEK.Courses.Server.Domain.Entities.BaseEntities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IPEK.Courses.Server.Data
{
    internal static class ConfigurationModelExtensions
    {
        internal static EntityTypeBuilder<TEntity> IgnoreName<TEntity>(this EntityTypeBuilder<TEntity> entity)
            where TEntity : BaseEntity
        {
            return entity.Ignore(x => x.Name);
        }

        internal static EntityTypeBuilder<TEntity> IgnoreNameAndDescription<TEntity>(this EntityTypeBuilder<TEntity> entity)
            where TEntity : BaseEntity
        {
            return entity.Ignore(x => x.Name).Ignore(x=> x.Description);
        }
    }
}
